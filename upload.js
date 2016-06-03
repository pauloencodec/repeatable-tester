!function () {
    window.upload = {
        pattern: 'http://remediodaterra.com.br/wp-content/uploads/2015/08/cachorro-quente.jpg',

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
                upload._convertToImgur(e.fpfile.url, function(url) {
                    upload.pattern = url;
                    upload.applyPattern();
                });
            }
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
        },

        _convertToImgur: function(url, callback) {
            $.ajax({
                url: 'https://api.imgur.com/3/image',
                type: 'POST',
                headers: {
                    Authorization: 'Client-ID 6cfcb3348241d16',
                    Accept: 'application/json'
                },

                data: { image: url },

                success: function(response) {
                    if (response.success)
                        callback(response.data.link);
                }
            });
        }
    };

    upload.init();
} ();