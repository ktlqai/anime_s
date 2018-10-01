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
	
	public function register() {
		$this->load->model('user_model');

		$this->load->helper('form');

		$this->load->library('form_validation');

		$this->form_validation->set_rules('login', 'lang:login', 
			'trim|required|min_length[4]',
			array('required' => $this->lang->line('login') . ' must not be empty!',
				'min_length' => $this->lang->line('login') . ' must be 4 or more characters!')
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
		$this->form_validation->set_rules('password', 'Password', 'required',
				array('required' => 'You must provide a %s.')
		);
		$this->form_validation->set_rules('passconf', 'Password Confirmation', 'required');
		$this->form_validation->set_rules('email', 'Email', 'required');

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
		}

		//$json_datas = array("input" => "login", "success" => false, "errormsg" => "Login is empty");

		echo json_encode($json_datas);
	}
}
