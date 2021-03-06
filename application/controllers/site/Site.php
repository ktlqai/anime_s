<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Site extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	public function __construct() {
		parent::__construct();

		//$this->load->library('session');
	}
	
	/*public function index()
	{
		//$this->load->view('site/site/index');
		//echo 'This page is no use!';
		if (isset($_SERVER['HTTP_REFERER'])) {
			echo str_replace('/index.php', '', $_SERVER['HTTP_REFERER']);
		}
		else {
			redirect('/site/blah');
		}
	}*/

	public function set_global_params() {
		$datas = array();

		if (null !== $this->input->post('language')) {
			$short_to_full_langs = array('en' => 'english', 'ru' => 'russian');
			$full_lang = $short_to_full_langs[$this->input->post('language')];
			$datas['language'] = $full_lang;
		}
		
		if (null !== $this->input->post('theme')) {
			$datas['theme'] = $this->input->post('theme');
		}
		
		/*if (!empty($datas)) {
			//$this->session->set_userdata($datas);
			//$_SESSION['datas'] = $datas;
			$_SESSION['language'] = $datas['language'];
			$_SESSION['theme'] = $datas['theme'];
		}*/
		if (array_key_exists('language', $datas)) {
			$_SESSION['language'] = $datas['language'];
		}
		if (array_key_exists('theme', $datas)) {
			$_SESSION['theme'] = $datas['theme'];
		}
		//$datas_2 = $this->session->userdata();

		//var_dump($datas); exit();
		//var_dump($datas_2); exit();
		//var_dump($_SESSION); exit();

		//var_dump($_SERVER['HTTP_REFERER']); exit();
		if (isset($_SERVER['HTTP_REFERER'])) {
			redirect(str_replace('/index.php', '', $_SERVER['HTTP_REFERER'])); exit();
		}
		else {
			redirect('/site/home'); exit();
		}
		//redirect('/site/site/test');
	}

	/*public function test() {
		var_dump($this->session->userdata());
	}*/
}
