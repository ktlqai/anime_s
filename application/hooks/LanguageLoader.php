<?php
class LanguageLoader
{
    function initialize() {
        $ci =& get_instance();
        $ci->load->helper('language');

        //$site_lang = $ci->session->userdata('language');
        $site_lang = (isset($_SESSION['language']) ? $_SESSION['language'] : 'english');
        /*if ($site_lang) {
            //$ci->lang->load('site', $ci->session->userdata('language'));
            //$ci->lang->load('site', $_SESSION['language']);
        } else {
            $ci->lang->load('site', 'english');
        }*/
        $ci->lang->load('site', $site_lang);
    }
}
