<?php

class db_conn {

    public $host;
    public $username;
    public $password;
    public $dab;
    public $conn;
    public $db_selected;

    public function __construct($host, $username, $password, $dab) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->dab = $dab;
    }

    function db_cn() {
        $this->conn = mysql_connect($this->host, $this->username, $this->password);

        if (!$this->conn) {
            die("Connection failed: " . mysql_connect_error());
        }
        $this->db_selected = mysql_select_db($this->dab);
    }

}

class form {

    public $name;
    public $email_d;
    public $subject;
    public $skpe;
    public $company;
    public $phone;
    public $write_msg;
    public $header;
    public $json_data = array(
        'success' => 0,
        'success_mess' => "",
        'error' => 0,
        'error_mess' => "",
        'user_data' => array(
            'email_mess' => "",
            'mobile_mess' => "",
        ),
    );

    public function __construct($name = "", $email_d = "", $subject = "", $skpe = "", $company = "", $phone = "", $write_msg = "") {

        $this->name = $name;
        $this->email_d = $email_d;
        $this->subject = $subject;
        $this->skpe = $skpe;
        $this->company = $company;
        $this->phone = $phone;
        $this->write_msg = $write_msg;
        return $this;
    }

    function index() {
        if ($this->name && $this->email_d && $this->subject && $this->skpe && $this->company && $this->phone && $this->write_msg) {
            if (!filter_var($this->email_d, FILTER_VALIDATE_EMAIL)) {
                $this->json_data["user_data"]["email_mess"] = "please ensert valid email";
                $this->json_data["error"] = 1;
            }
            if (preg_match('/^[0-9]{8,15}+$/', $this->phone) == 0) {
                $this->json_data["user_data"]["mobile_mess"] = "please ensert valid mobile number";
                $this->json_data["error"] = 1;
            } else if ($this->json_data["error"] == 0) {
                mysql_query("INSERT INTO form_data (name,email, Subject, Skype, Company,Phone,	Message)
VALUES ('$this->name', '$this->email_d', '$this->subject', '$this->skpe', '$this->company', '$this->phone', '$this->write_msg')");
                $all_data = $this->name . $this->email_d . $this->subject . $this->skpe . $this->company . $this->phone . $this->write_msg;
//                mail('rajtripathi.cool@gmail.com', $this->subject, $all_data, $this->header);
                $this->json_data["success_mess"] = "thanks for response we will contact to you soon";
                $this->json_data["success"] = 1;
            }
        } else {
            $this->json_data["error_mess"] = "all field required";
            $this->json_data["error"] = 1;
        }
    }

}

$db_connect = new db_conn("localhost", "root", "", "x-dev_data");
$db_connect->db_cn();
$insert_data = new form($_POST["name"], $_POST["email_d"], $_POST["subject"], $_POST["skpe"], $_POST["company"], $_POST["phone"], $_POST["write_msg"]);
echo $insert_data->index();
header('Content-Type:application/json');

echo json_encode($insert_data->json_data)
//?>