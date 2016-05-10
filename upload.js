!function () {
    window.upload = {
        pattern: 'http://remediodaterra.com.br/wp-content/uploads/2015/08/cachorro-quente.jpg',
        extension: '',

        init: function () {
            upload.config();
            upload.events();
        },

        config: function() {
            upload.applyPattern();
        },

        events: function() {
            $('#resolution').on('change', upload.onChangeResolution);
            $('#image-test').on('load error', upload.onImageLoad);
        },

        onChangeResolution: function() {
            $('.backdrop').show();
            upload.applyPattern();
        },

        onImageLoad: function() {
            $('.backdrop').hide();
        },

        onFileUpload: function (e) {
            $('.backdrop').show();

            if (e.fpfile.url) {
                upload.extension = e.fpfile.filename.split('.').pop();
                upload.pattern = e.fpfile.url;
                upload.applyPattern();
            }
        },

        applyPattern: function () {
            $('#image-test').prop('src', upload.getTestUrl());
        },

        getTestUrl: function (resolution) {
            return `http://s7d4.scene7.com/ir/render/AllsteelRender/TuxedoClub_0030?wid=1000&fmt=png-alpha&qlt=100&obj=root/channels/dflt/fram1/pr6&show&obj=root/channels/dflt/uphl1/up01&src=${upload.getSource()}&res=${upload.getResolution()}&show&obj=root/channels/dflt/drop&show&obj=root/channels/dflt/stat&show&obj=root&req=object&wid=600`;
        },

        getResolution: function() {
            return +$('#resolution').val() || 500;
        },

        getSource: function() {
            return `%7b${upload.pattern.replace('https', 'http').replace('cdn.filestackcontent.com', 'cdn.filepicker.io/api/file')}${upload.extension ? `+.${upload.extension}` : ''}%7d`;
        }
    };

    upload.init();
} ();