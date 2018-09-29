<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

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
	
	public function index()
	{
		//$datas = $this->session->userdata();
		//$datas = $_SESSION['datas'];
		$datas = $_SESSION;
		$data['datas'] = $datas;

		$this->load->view('site/home/index', $data);
    }
    
    public function register() {
		//$datas = $this->session->userdata();
		//$datas = $_SESSION['datas'];
		$datas = $_SESSION;
		$data['datas'] = $datas;

		//$this->load->view('site/home/index', $data);
		$this->load->view('site/header', $data);
		$this->load->view('site/login/register', $data);
		$this->load->view('site/right_sidebar_and_footer', $data);
        
    }
}
