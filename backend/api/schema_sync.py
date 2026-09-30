import logging
from django.db import connection

logger = logging.getLogger(__name__)

_synced = False


def auto_sync_schema():
    global _synced
    if _synced:
        return
    try:
        with connection.cursor() as cursor:
            tables = [t.lower() for t in connection.introspection.table_names(cursor)]
            is_mysql = 'mysql' in connection.vendor.lower()

            # 1. Check api_service table
            if 'api_service' in tables:
                cols = {col.name.lower() for col in connection.introspection.get_table_description(cursor, 'api_service')}

                if 'faq_title' not in cols:
                    cursor.execute("ALTER TABLE api_service ADD COLUMN faq_title VARCHAR(300) NOT NULL DEFAULT ''")

                if 'faq_description' not in cols:
                    text_type = 'LONGTEXT NULL' if is_mysql else 'TEXT NULL'
                    cursor.execute(f"ALTER TABLE api_service ADD COLUMN faq_description {text_type}")

                if 'schema_markup' not in cols:
                    text_type = 'LONGTEXT NULL' if is_mysql else 'TEXT NULL'
                    cursor.execute(f"ALTER TABLE api_service ADD COLUMN schema_markup {text_type}")

            # 2. Check api_homepage table
            if 'api_homepage' in tables:
                cols = {col.name.lower() for col in connection.introspection.get_table_description(cursor, 'api_homepage')}
                if 'faq_eyebrow' not in cols:
                    cursor.execute("ALTER TABLE api_homepage ADD COLUMN faq_eyebrow VARCHAR(200) NOT NULL DEFAULT '⊙ Common Questions'")
                if 'faq_title' not in cols:
                    cursor.execute("ALTER TABLE api_homepage ADD COLUMN faq_title VARCHAR(300) NOT NULL DEFAULT 'Frequently Asked Questions'")
                if 'faq_description' not in cols:
                    text_type = 'LONGTEXT NULL' if is_mysql else 'TEXT NULL'
                    cursor.execute(f"ALTER TABLE api_homepage ADD COLUMN faq_description {text_type}")
                if 'faqs' not in cols:
                    text_type = 'LONGTEXT NULL' if is_mysql else 'TEXT NULL'
                    cursor.execute(f"ALTER TABLE api_homepage ADD COLUMN faqs {text_type}")
            elif is_mysql:
                cursor.execute("""
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
                      `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                      `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                      `faq_description` longtext NULL,
                      `faq_eyebrow` varchar(200) NOT NULL DEFAULT '⊙ Common Questions',
                      `faq_title` varchar(300) NOT NULL DEFAULT 'Frequently Asked Questions',
                      `faqs` longtext NULL,
                      PRIMARY KEY (`id`)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
                """)

            # 3. Also mark migrations 0037, 0038, 0039 as recorded if django_migrations exists
            if 'django_migrations' in tables:
                cursor.execute("SELECT name FROM django_migrations WHERE app = 'api'")
                applied = {row[0] for row in cursor.fetchall()}
                for mig_name in [
                    '0037_service_schema_markup',
                    '0038_homepage',
                    '0039_homepage_faq_description_homepage_faq_eyebrow_and_more'
                ]:
                    if mig_name not in applied:
                        cursor.execute("INSERT INTO django_migrations (app, name, applied) VALUES ('api', %s, NOW())" if is_mysql else "INSERT INTO django_migrations (app, name, applied) VALUES ('api', %s, datetime('now'))", [mig_name])

        _synced = True
    except Exception as e:
        logger.warning(f"Auto schema sync notice: {e}")
