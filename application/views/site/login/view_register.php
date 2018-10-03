
			<div id="body_wrapper">
				<div id="content" class="">
					<div id="cont" class="">
						
	<h3 style="text-align: center;margin-bottom: 0;">After registration, we will send you an e-mail confirmation link.</h3>
	<p style="text-align: center;margin-top:0;color: #555">We use Google reCaptcha to validate you are not a bot.</p>
	<div class="post_content">
		<div class="title">Register</div>
		<table class="register_table">
			<tbody><tr>
				<td><?php echo lang('login'); ?>:</td>
				<td><input id="login" type="text" name="username" value=""></td>
				<td id="login_error" style="color:red;"></td>
			</tr>
			<tr>
				<td>Password:</td>
				<td><input id="password" type="password" name="password" value=""></td>
				<td id="password_error" style="color:red;"></td>
			</tr>
			<tr>
				<td>Repeat password:</td>
				<td><input id="password2" type="password" name="password2" value=""></td>
				<td id="password2_error" style="color:red;"></td>
			</tr>
			<tr>
				<td>E-mail:</td>
				<td><input id="email" type="text" name="email" value=""><br>(for confirmation code, please don't use phone email like blabla@docomo.ne.jp)</td>
				<td id="email_error" style="color:red;"></td>
			</tr>
			<tr>
				<td><input id="registersubmit" type="submit" value="Send"></td>
				<td><a href="https://anime-pictures.net/index/privacy_policy">Privacy policy</a></td>
				<td style="color:red;"></td>
			</tr>
		</tbody></table>
	</div>

					</div>
				</div>
				

		
	
	<script async="" src="./Anime wallpaper_files/analytics.js.tải xuống"></script><script type="text/javascript" async="" src="./Anime wallpaper_files/recaptcha__vi.js.tải xuống"></script><script type="text/javascript">
		var static_host = "/static";
		var style_cdn_host = "/static/styles";
		var js_cdn_host = "/static/js";
		var images_preview_host = "https://cdn.anime-pictures.net";
		var site_theme = "first";
		var lang = "en";
		var yandex_lang = lang;
		if (yandex_lang != "ru") {
			yandex_lang = "en";
		}
		var facebook_lang = "en_US";
		var is_login = false;
		var is_moderator = false;
		var last_url = new String(document.location.href);
		var ts = {
			"Ok":'Ok',
			"Error":'Error',
			"Download picture":'Download picture',
			"Done":'Done',
			"Cancel": 'Cancel',
			"WARNING Add new tag": 'WARNING! You are adding a completely new tag: ',
			"ERROR Add new tag": 'ERROR! You should not add new tags. Please choose from existing tags. Any requests should be written in comments. Tag:',
			"Remove the tag?": 'Remove this tag?',
			"Edit tag": 'Edit tag',
			"Remove area": 'Remove area',
			"subscribe": 'subscribe',
			"unsubscribe": 'unsubscribe',
			"posts_title": 'Anime pictures and wallpapers search',
			"but we have problems with next tags:": 'but we have problems with next tags:',
			"unknown tag": 'unknown tag',
			"have already in recommendation": 'have already in recommendation',
			"have already on picture": 'have already on picture',
		};
	</script>
	<!--
	<script type="text/javascript" src="./Anime wallpaper_files/std.js.tải xuống"></script>-->
	
	<!--
	<script type="text/javascript" src="<?php echo base_url(); ?>js/std.js"></script>-->
	
		<script type="text/javascript" src="./Anime wallpaper_files/jstz.min.js.tải xuống"></script>
		<script type="text/javascript">
			var tz = jstz.determine(); // Determines the time zone of the browser client
			var time_zone = tz.name();
		</script>

	<script src="./Anime wallpaper_files/api.js.tải xuống"></script>
	<script type="text/javascript">
		(function() {
			var token = '';
			
			/*var get_captcha = function() {
				grecaptcha.ready(function() {
					grecaptcha.execute('6LekE2wUAAAAAMLyxxd5Iz5HC1owZ6yQXxYMuNYO', {action: 'registration'})
					.then(function(tk) {
						token = tk;
						get_by_id("registersubmit").disabled = false;
					});
				});
			};
			get_captcha();*/

			var register = function() {
				get_by_id("login_error").innerHTML = "";
				get_by_id("password_error").innerHTML = "";
				get_by_id("password2_error").innerHTML = "";
				get_by_id("email_error").innerHTML = "";
				var request = function(req) {
					alert(req.responseText)
					if (req.readyState != 4) {
						return;
					}
					if (req.status != 200) {
						console.log("Network error");
						return;
					}
					var json_req = JSON.parse(req.responseText);
					if (json_req["success"]) {
						window.location = json_req["redirect"];
					} else {
						/*if (json_req["input"] === 'captcha') {
							alert(json_req["errormsg"]);
							get_by_id("registersubmit").disabled = true;
							get_captcha();
						} else */if (json_req["input"] != null) {
							get_by_id(json_req["input"] + "_error").innerHTML = json_req["errormsg"];
						} else {
							alert(json_req["errormsg"]);
						}
					}
				}
				ajax_request2(
					"<?php echo base_url(); ?>/site/login/register",
					{
						"login": get_by_id("login").value,
						"password": get_by_id("password").value,
						"password2": get_by_id("password2").value,
						"email": get_by_id("email").value,
						"token": token
					},
					request
				);
				//alert('abc')
			}
			document.addEventListener("DOMContentLoaded", function() {
				get_by_id("registersubmit").addEventListener("click", register);
			});
		})();
	</script>

		
	<script type="text/javascript">
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-1465472-1', 'anime-pictures.net');
		ga('send', 'pageview');
	</script>
	
	<script type="text/javascript" defer="">
		var autocomplete_side_search_tag;
		document.addEventListener("DOMContentLoaded", function() {
				autocomplete_side_search_tag = new AnimePictures.AutoComplete('side_search_tag', '/pictures/autocomplete_tag', false);
		});
	</script>
	
		<script src="./Anime wallpaper_files/ulogin.js.tải xuống" defer=""></script>
	
	


	

























<div id="ulogin_receiver_container" style="margin: 0px; padding: 0px; outline: none; border: none; border-radius: 0px; cursor: default; float: none; position: relative; display: none; width: 0px; height: 0px; left: 0px; top: 0px; box-sizing: content-box;"><iframe name="easyXDM_default6069_provider" id="easyXDM_default6069_provider" frameborder="0" src="./Anime wallpaper_files/stats.html" style="margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; position: absolute; left: 0px; top: 0px; overflow: hidden; width: 100%; height: 100%;"></iframe></div><div class="ulogin-dropdown" id="ul_1538193114482" style="margin: 0px; padding: 0px; outline: none; border: 5px solid rgb(102, 102, 102); border-radius: 4px; cursor: default; float: none; position: absolute; display: none; width: 128px; height: 310px; left: 0px; top: 0px; box-sizing: content-box; z-index: 9999; box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;"><iframe name="easyXDM_default6070_provider" id="easyXDM_default6070_provider" frameborder="0" src="./Anime wallpaper_files/drop.html" style="margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; position: relative; left: 0px; top: 0px; overflow: hidden; width: 128px; height: 310px;"></iframe><div style="margin: 0px; padding: 0px; outline: none; border: 5px solid rgb(102, 102, 102); border-radius: 0px; cursor: default; float: none; position: absolute; display: inherit; width: 41px; height: 13px; left: initial; top: 100%; box-sizing: content-box; background: rgb(0, 0, 0); right: -5px; text-align: center;"><a href="https://anime-pictures.net/login/view_register?lang=en" target="_blank" style="margin: 0px; padding: 0px; outline: none; border: none; border-radius: 0px; cursor: default; float: none; position: relative; display: inherit; width: 41px; height: 13px; left: 0px; top: 0px; box-sizing: content-box; background: url(&quot;https://u-login.com/img/text.png&quot;) no-repeat;"></a></div></div><ul class="autocomplite" style="width: 180px; left: 1064px; top: 684.594px; visibility: hidden;"></ul><div><div class="grecaptcha-badge" data-style="bottomright" style="width: 256px; height: 60px; transition: right 0.3s ease 0s; position: fixed; bottom: 14px; right: -186px; box-shadow: gray 0px 0px 5px;"><div class="grecaptcha-logo"><iframe src="./Anime wallpaper_files/anchor.html" width="256" height="60" role="presentation" name="a-bohmk472k4hm" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe></div><div class="grecaptcha-error"></div><textarea id="g-recaptcha-response-100000" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea></div></div><img src="./Anime wallpaper_files/pixel.php" style="display: none;">
    