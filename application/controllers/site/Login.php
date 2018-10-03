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
    
    public function view_register() {
		//$datas = $this->session->userdata();
		//$datas = $_SESSION['datas'];
		$datas = $_SESSION;
		$data['datas'] = $datas;

		//$this->load->view('site/home/index', $data);
		$this->load->view('site/header', $data);
		$this->load->view('site/login/view_register', $data);
		$this->load->view('site/right_sidebar_and_footer', $data);
        
	}

	function check_login_existed($value) {
		$this->load->model('user_model');
		
		return !$this->user_model->check_exists(array('login' => $value));
	}

	function check_email_existed($value) {
		$this->load->model('user_model');
		
		return !$this->user_model->check_exists(array('email' => $value));
	}
	
	public function register() {
		$this->load->model('user_model');

		$this->load->helper('form');

		$this->load->library('form_validation');

		$this->form_validation->set_rules('login', 'lang:login',
			'trim|required|min_length[4]|callback_check_login_existed',
			array('required' => $this->lang->line('login_view_register_form_login_empty_error'),
				'min_length' => $this->lang->line('login_view_register_form_login_min_length_error'),
				'check_login_existed' => $this->lang->line('login_view_register_form_login_existed_error'))
		);
		/*$this->form_validation->set_rules('login', 'lang:login',
			array('login_callable', function($value) {
				return !$this->user_model->check_exists(array('login' => $value));
			}),
			array('login_callable' => $this->lang->line('login') . ' must be different as it was already chosen!')
		);*/
		
		/*$this->form_validation->set_rules('field_name', 'Field Label', 'rule1|rule2|rule3',
        	array('rule2' => 'Error Message on rule2 for this field_name')
		);*/
		$this->form_validation->set_rules('password', 'Password',
			/*'trim|*/'required|min_length[6]',
			array('required' => $this->lang->line('login_view_register_form_password_empty_error'),
				'min_length' => $this->lang->line('login_view_register_form_password_min_length_error'))
		);
		$this->form_validation->set_rules('password2', 'Password Confirmation',
			'required|min_length[6]|matches[password]',
			array('required' => $this->lang->line('login_view_register_form_password2_empty_error'),
				'min_length' => $this->lang->line('login_view_register_form_password2_min_length_error'),
				'matches' => $this->lang->line('login_view_register_form_password2_matches_error'))
		);
		$this->form_validation->set_rules('email', 'Email',
			'trim|required|valid_email|callback_check_email_existed',
			array('required' => $this->lang->line('login_view_register_form_email_empty_error'),
				'valid_email' => $this->lang->line('login_view_register_form_email_valid_error'),
				'check_email_existed' => $this->lang->line('login_view_register_form_email_existed_error'))
		);

		$json_datas = array();

		if ($this->form_validation->run() == FALSE)
		{
				//$this->load->view('myform');
				$post_datas = $this->input->post();
				foreach ($post_datas as $k => $v) {
					if (form_error($k) != '') {
						$json_datas['input'] = $k;
						$json_datas['success'] = false;
						$json_datas['errormsg'] = strip_tags(form_error($k));

						break;
					}
				}
		}
		else
		{
				//$this->load->view('formsuccess');
				//$password_hashed = password_hash("rasmuslerdorf", PASSWORD_BCRYPT);
				$password = $this->input->post('password');
				$password_hashed = password_hash($password, PASSWORD_BCRYPT);
				$user_data = array(
					'login' => $this->input->post('login'),
					'password' => $password_hashed,
					'email' => $this->input->post('email'),
				);

				$return_insert = $this->user_model->create($user_data);
				if ($return_insert) {
					$json_datas = array("input" => "login", "success" => true,
						"errormsg" => "Registration was successful!",
						'redirect' => base_url() . 'site/login/login'
					);
				}
				else {
					$json_datas = array("input" => "login", "success" => false,
						"errormsg" => "Database create user error! Reload register form & make registration again.");
				}
		}

		//$json_datas = array("input" => "login", "success" => false, "errormsg" => "Login is empty");

		echo json_encode($json_datas);
	}

	public function login() {
		//$datas = $this->session->userdata();
		//$datas = $_SESSION['datas'];
		$datas = $_SESSION;
		$data['datas'] = $datas;

		$this->load->view('site/login/login', $data);
		/*$this->load->view('site/header', $data);
		$this->load->view('site/login/view_register', $data);
		$this->load->view('site/right_sidebar_and_footer', $data);*/
	}
}
