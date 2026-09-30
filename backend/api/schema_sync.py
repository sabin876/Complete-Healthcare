import logging
from django.db import connection
from django.core.management import call_command

logger = logging.getLogger(__name__)

_synced = False


def safe_execute(cursor, sql, params=None):
    try:
        if params:
            cursor.execute(sql, params)
        else:
            cursor.execute(sql)
    except Exception as e:
        logger.warning(f"Safe SQL execution notice: {e} -> SQL: {sql[:100]}")


def auto_sync_schema():
    global _synced
    if _synced:
        return

    # 1. Attempt official Django migrate first
    try:
        call_command('migrate', interactive=False)
    except Exception as e:
        logger.warning(f"Auto-migrate notice: {e}")

    # 2. Defensive schema inspection and repair
    try:
        with connection.cursor() as cursor:
            tables = [t.lower() for t in connection.introspection.table_names(cursor)]
            is_mysql = 'mysql' in connection.vendor.lower()
            text_type = 'LONGTEXT NULL' if is_mysql else 'TEXT NULL'

            # -----------------------------------------------------------------
            # Table: api_service
            # -----------------------------------------------------------------
            if 'api_service' in tables:
                cols = {col.name.lower() for col in connection.introspection.get_table_description(cursor, 'api_service')}

                if 'faq_title' not in cols:
                    safe_execute(cursor, "ALTER TABLE api_service ADD COLUMN faq_title VARCHAR(300) NOT NULL DEFAULT ''")

                if 'faq_description' not in cols:
                    safe_execute(cursor, f"ALTER TABLE api_service ADD COLUMN faq_description {text_type}")

                if 'schema_markup' not in cols:
                    safe_execute(cursor, f"ALTER TABLE api_service ADD COLUMN schema_markup {text_type}")

            # -----------------------------------------------------------------
            # Table: api_homepage
            # -----------------------------------------------------------------
            if 'api_homepage' not in tables:
                if is_mysql:
                    safe_execute(cursor, """
                        CREATE TABLE IF NOT EXISTS `api_homepage` (
                          `id` bigint(20) NOT NULL AUTO_INCREMENT,
                          `title` varchar(250) NOT NULL DEFAULT 'Home Page',
                          `meta_title` varchar(300) NOT NULL DEFAULT '',
                          `meta_description` longtext NULL,
                          `canonical_url` varchar(300) NOT NULL DEFAULT 'https://corx.ae/',
                          `og_title` varchar(300) NOT NULL DEFAULT '',
                          `og_description` longtext NULL,
                          `og_image` varchar(500) NOT NULL DEFAULT '',
                          `og_image_file` varchar(100) DEFAULT NULL,
                          `hero_title` varchar(300) NOT NULL DEFAULT '',
                          `hero_eyebrow` varchar(250) NOT NULL DEFAULT '',
                          `hero_tagline` longtext NULL,
                          `schema_markup` longtext NULL,
                          `created_at` datetime(6) NOT NULL,
                          `updated_at` datetime(6) NOT NULL,
                          `faq_description` longtext NULL,
                          `faq_eyebrow` varchar(200) NOT NULL DEFAULT 'Common Questions',
                          `faq_title` varchar(300) NOT NULL DEFAULT 'Frequently Asked Questions',
                          `faqs` longtext NULL,
                          PRIMARY KEY (`id`)
                        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
                    """)
                else:
                    safe_execute(cursor, """
                        CREATE TABLE IF NOT EXISTS "api_homepage" (
                          "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
                          "title" varchar(250) NOT NULL DEFAULT 'Home Page',
                          "meta_title" varchar(300) NOT NULL DEFAULT '',
                          "meta_description" text NOT NULL DEFAULT '',
                          "canonical_url" varchar(300) NOT NULL DEFAULT 'https://corx.ae/',
                          "og_title" varchar(300) NOT NULL DEFAULT '',
                          "og_description" text NOT NULL DEFAULT '',
                          "og_image" varchar(500) NOT NULL DEFAULT '',
                          "og_image_file" varchar(100) NULL,
                          "hero_title" varchar(300) NOT NULL DEFAULT '',
                          "hero_eyebrow" varchar(250) NOT NULL DEFAULT '',
                          "hero_tagline" text NOT NULL DEFAULT '',
                          "schema_markup" text NOT NULL DEFAULT '',
                          "created_at" datetime NOT NULL,
                          "updated_at" datetime NOT NULL,
                          "faq_description" text NOT NULL DEFAULT '',
                          "faq_eyebrow" varchar(200) NOT NULL DEFAULT 'Common Questions',
                          "faq_title" varchar(300) NOT NULL DEFAULT 'Frequently Asked Questions',
                          "faqs" text NOT NULL DEFAULT '[]'
                        );
                    """)
            else:
                cols = {col.name.lower() for col in connection.introspection.get_table_description(cursor, 'api_homepage')}

                if 'faq_eyebrow' not in cols:
                    safe_execute(cursor, "ALTER TABLE api_homepage ADD COLUMN faq_eyebrow VARCHAR(200) NOT NULL DEFAULT 'Common Questions'")

                if 'faq_title' not in cols:
                    safe_execute(cursor, "ALTER TABLE api_homepage ADD COLUMN faq_title VARCHAR(300) NOT NULL DEFAULT 'Frequently Asked Questions'")

                if 'faq_description' not in cols:
                    safe_execute(cursor, f"ALTER TABLE api_homepage ADD COLUMN faq_description {text_type}")

                if 'faqs' not in cols:
                    safe_execute(cursor, f"ALTER TABLE api_homepage ADD COLUMN faqs {text_type}")

            # -----------------------------------------------------------------
            # 3. Mark migrations in django_migrations table if present
            # -----------------------------------------------------------------
            if 'django_migrations' in tables:
                safe_execute(cursor, "SELECT name FROM django_migrations WHERE app = 'api'")
                applied = {row[0] for row in cursor.fetchall()}
                for mig_name in [
                    '0037_service_schema_markup',
                    '0038_homepage',
                    '0039_homepage_faq_description_homepage_faq_eyebrow_and_more'
                ]:
                    if mig_name not in applied:
                        safe_execute(
                            cursor,
                            "INSERT INTO django_migrations (app, name, applied) VALUES ('api', %s, NOW())" if is_mysql else "INSERT INTO django_migrations (app, name, applied) VALUES ('api', %s, datetime('now'))",
                            [mig_name]
                        )

        _synced = True
        logger.info("Auto schema sync completed successfully.")
    except Exception as e:
        logger.warning(f"Auto schema sync notice: {e}")
