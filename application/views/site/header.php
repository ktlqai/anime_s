<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<!-- saved from url=(0027)https://anime-pictures.net/ -->
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
		<meta http-equiv="content-language" content="en">
		<title>
	Anime pictures and wallpapers
</title>
		<meta content="
	Anime pictures and wallpapers
" property="og:title">
		<meta content="anime-pictures.net" property="og:site_name">
		<meta name="description" content="
	Anime pictures and wallpapers with a unique search for free. More than 500,000 pictures.
">
		<meta content="
	Anime pictures and wallpapers with a unique search for free. More than 500,000 pictures.
" property="og:description">
		<meta name="google-site-verification" content="cwLDDm-7M0oU3OEn9McwgkcPmpJR_qOfucSVReVOWUQ">
		<meta name="yandex-verification" content="548bfb023a8f8712">
		<meta name="alexaVerifyID" content="seBhf0aqrLoG_sBwnDzvHEN_Xfo">
		<meta name="juicyads-site-verification" content="fd1b111411d78eaba061a7c6e362e9ff">
		<meta name="trafficjunky-site-verification" content="3opa4p4vt">
		<meta property="fb:admins" content="100001454947865">
		<meta property="fb:app_id" content="287630047923885">
		<meta name="wot-verification" content="2b7ac59b696124c26d76">
		<link rel="manifest" href="https://anime-pictures.net/manifest.json">
		<link href="https://plus.google.com/101605081835629313499" rel="publisher">
		
	
	<link href="./Anime pictures and wallpapers_files/css" rel="stylesheet" type="text/css">
	<!--
	<link href="./Anime pictures and wallpapers_files/first.css" rel="stylesheet" type="text/css">
	-->
	<link href="<?php echo base_url(); ?>css/<?php echo (isset($datas['theme']) ? $datas['theme'] : 'first'); ?>.css" rel="stylesheet" type="text/css">
	
	<link rel="icon" type="image/png" href="https://anime-pictures.net/static/styles/golova_icon_64.png">
	<link relx="icon" sizes="192x192" href="https://anime-pictures.net/static/styles/golova_icon_192.png">
		<meta name="theme-color" content="#f1bf48">


		
	

	</head>

	<body class="None">
	<?php //var_dump($datas); ?>
		<header>
			
	<div class="menu">
		<ul>
			<nav>
					<li><a href="https://anime-pictures.net/" target="_self"><?php echo lang('main'); ?></a></li>
				
					<li><a href="https://anime-pictures.net/pictures/view_posts/0?lang=en" target="_self">Pictures</a></li>
					<li class="disable_on_small"><a href="https://anime-pictures.net/pictures/view_all_tags/0?lang=en" target="_self">Tags</a></li>
					<li class="disable_on_small"><a href="https://anime-pictures.net/index/faq?lang=en" target="_self">FAQ</a></li>
					<li class="disable_on_small"><a href="https://anime-pictures.net/chat/view?lang=en" target="_self">Chat</a></li>

					<li><a href="https://anime-pictures.net/index/about?lang=en" target="_self">About</a></li>
					<li>
						<a href="https://anime-pictures.net/pictures/view_add_wall?lang=en" title="Add image">
							<span class="icon icon_add_image"></span> 
						</a>
					</li>
					<li>
						<a href="https://anime-pictures.net/profile/messages_users/0?lang=en" title="New messages">
							<span class="icon icon_new_message"></span>
							0
						</a>
					</li>
				
			</nav>
				<li class="right">
					<form id="form_global_params" method="post" action="<?php echo base_url(); ?>site/site/set_global_params">
						Language:
						<select name="language" onchange="this.form.submit();">
						<?php $language = (isset($datas['language']) ? $datas['language'] : 'english'); ?>
							<option value="en"<?php echo ($language == 'english' ? ' selected="&quot;selected&quot;"' : ''); ?>>EN</option>
							<option value="ru"<?php echo ($language == 'russian' ? ' selected="&quot;selected&quot;"' : ''); ?>>RU</option>
							<option value="jp"<?php echo ($language == 'japanese' ? ' selected="&quot;selected&quot;"' : ''); ?>>JP</option>
							<option value="es"<?php echo ($language == 'spanish' ? ' selected="&quot;selected&quot;"' : ''); ?>>ES</option>
							<option value="de"<?php echo ($language == 'german' ? ' selected="&quot;selected&quot;"' : ''); ?>>DE</option>
							<option value="fr"<?php echo ($language == 'french' ? ' selected="&quot;selected&quot;"' : ''); ?>>FR</option>
						</select>
						Theme:
						<select name="theme" onchange="this.form.submit();">
						<?php $theme = (isset($datas['theme']) ? $datas['theme'] : 'first'); ?>
							<option value="first"<?php echo ($theme == 'first' ? ' selected="&quot;selected&quot;"' : ''); ?>>White</option>
							<option value="second"<?php echo ($theme == 'second' ? ' selected="&quot;selected&quot;"' : ''); ?>>Orange</option>
						</select>
					</form>
				</li>
					<li class="right">
						<a href="https://anime-pictures.net/login/logout">Logout</a>
					</li>
		</ul>
	</div>
		
	<div class="sub_menu">
		<div>
			<span>
				<span class="sub_menu_number">60</span> approved pictures in the last 24 hours.
				New pictures: <span class="sub_menu_number">341</span>.
				<a href="https://anime-pictures.net/pictures/view_posts/0?status=pre&amp;lang=en" style="color: inherit;text-decoration: none;">In pre public mode: <span class="sub_menu_number">1</span>.</a>
				Banned: <span class="sub_menu_number">4</span>.
			</span>
			
		</div>
	</div>


        </header>
        