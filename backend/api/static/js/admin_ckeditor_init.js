document.addEventListener('DOMContentLoaded', function() {
  function initEditors() {
    if (typeof CKEDITOR !== 'undefined') {
      const contentEl = document.getElementById('id_content');
      if (contentEl && !CKEDITOR.instances['id_content']) {
        CKEDITOR.replace('id_content', {
          height: 400,
          toolbar: [
            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
            { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
            { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
            { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },
            '/',
            { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'tools', items: [ 'Maximize', 'ShowBlocks', 'Source' ] }
          ]
        });
      }
      const descEl = document.getElementById('id_description');
      if (descEl && !CKEDITOR.instances['id_description']) {
        CKEDITOR.replace('id_description', {
          height: 300
        });
      }
    }
  }

  initEditors();
  // Retry if CKEditor script loads asynchronously
  setTimeout(initEditors, 500);
  setTimeout(initEditors, 1500);
});
