!function () {
    window.upload = {
        pattern: 'http://s7d9.scene7.com/is/image/hnicorprender/allsteel-dotty-crimini?wid=400',

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
            $('#filepicker').on('change', upload.handleFile);
        },

        onChangeResolution: function() {
            $('.backdrop').show();
            upload.applyPattern();
        },

        onImageLoad: function() {
            $('.backdrop').hide();
        },

        handleFile: function() {
            $('.backdrop').show();

            var file = $('#filepicker').get(0).files[0]; 

            if (!file || !file.type.match(/image.*/)) return;

            var fd = new FormData();
            fd.append('image', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/upload.json');
            xhr.setRequestHeader('Authorization', 'Client-ID 6cfcb3348241d16');

            xhr.onload = function() {
                var response = JSON.parse(xhr.responseText);

                if (response.success) {
                    upload.pattern = response.data.link;
                    upload.applyPattern();
                }
            };

            xhr.send(fd);
        },

        applyPattern: function () {
            $('#image-test').prop('src', upload.getTestUrl());
            $('#image-test-zoom').prop('src', upload.getTestUrl(2000));
        },

        getTestUrl: function (width) {
            width = width || 600;
            return `http://s7d4.scene7.com/ir/render/AllsteelRender/TuxedoClub_0030?wid=${width}&fmt=png-alpha&qlt=100&obj=root/channels/dflt/fram1/pr6&show&obj=root/channels/dflt/uphl1/up01&src=${upload.getSource()}&res=${upload.getResolution()}&show&obj=root/channels/dflt/drop&show&obj=root/channels/dflt/stat&show&obj=root&req=object&wid=${width}`;
        },

        getResolution: function() {
            return +$('#resolution').val() || 500;
        },

        getSource: function() {
            return `%7b${upload.pattern.replace('https', 'http')}%7d`;
        }
    };

    upload.init();
} ();