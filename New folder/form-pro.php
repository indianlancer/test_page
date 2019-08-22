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
    public $url;
    public $budget;
    public $phone;
    public $write_msg;
    public $file;
    public $header;
    public $src = 'assets/files/';
    public $tmp;
    public $filename;
    public $type;
    public $uploadfile;
    public $json_data = array(
        'success' => 0,
        'success_mess' => "",
        'error' => 0,
        'error_mess' => "",
        'user_data' => array(
            'email_mess' => "",
            'mobile_mess' => "",
            'url_mess' => "",
        ),
    );

    public function __construct($name, $email_d, $phone, $budget, $requir) {
        $this->name = $name;
        $this->email_d = $email_d;
        $this->budget = $budget;
        $this->phone = $phone;
        $this->write_msg = $requir;
        return $this;
    }

    function index() {
        if ($this->name && $this->email_d && $this->budget && $this->phone && $this->write_msg) {
            if (!filter_var($this->email_d, FILTER_VALIDATE_EMAIL)) {
                $this->json_data["user_data"]["email_mess"] = "please ensert valid email";
                $this->json_data["error"] = 1;
            }
            if (preg_match('/^[0-9]{8,15}+$/', $this->phone) == 0) {
                $this->json_data["user_data"]["mobile_mess"] = "please ensert valid mobile number";
                $this->json_data["error"] = 1;
            }
            if (isset($_FILES['upload'])) {
                $this->filename = $_FILES['upload']["name"];
                $dir = 'assets/files/';
                $files2 = scandir($dir, 1);
                if (in_array($this->filename, $files2)) {
                    $this->filename = date("his") . "--" . $_FILES['upload']["name"];
                }
                $this->tmp = $_FILES['upload']["tmp_name"];
                $this->uploadfile = $this->src . basename($this->filename);
                if (!move_uploaded_file($this->tmp, $this->uploadfile)) {
                    echo "error in file uploading";
                }
            }
//            if ($this->budget == 'What is your Allocated budget?') {
//                $this->json_data["user_data"]["select_check"] = "this field is required";
//                $this->json_data["error"] = 1;
//            } else 
            if ($this->json_data["error"] == 0) {
                if (isset($_POST["url"])) {
                    $this->url = $_POST["url"];
                    if (preg_match('/(?:https?:\/\/)?(?:[a-zA-Z0-9.-]+?\.(?:com|net|org|gov|edu|mil|tk|ml)|\d+\.\d+\.\d+\.\d+)/', $this->url) == 0) {
                        $this->json_data["user_data"]["url_mess"] = "please enter valid URL";

                        $this->json_data["error"] = 1;
                    }
                }
                if ($this->json_data["user_data"]["url_mess"] == "") {
                    $this->header = "From: srajtripathi.cool@gmail.com\r\n";
                    $this->header .= "MIME-Version: 1.0\r\n";
                    $this->header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                    $this->header .= "X-Priority: 1\r\n";
                    ini_set("SMTP", "ssl://smtp.gmail.com");
                    ini_set("smtp_port", "465");
                    $all_data = $this->name . "<br>" . $this->email_d . "<br>" . $this->phone . "<br>" . $this->budget . "<br>" . $this->write_msg . "<br>" . $this->filename . "<br>" . $this->url;
//                   mail('rajtripathi.cool@gmail.com',$this->email_d,$all_data, $this->header);
                    mysql_query("INSERT INTO project_data (name, email, phone, budget, requirements, file, url)
VALUES ('$this->name', '$this->email_d', '$this->phone','$this->budget', '$this->write_msg', '$this->filename', '$this->url')");
                    $this->json_data['success'] = 1;
                    $this->json_data['success_mess'] = 'your data sent to our team. we will respond soon.';
                }
            }
        } else {
            $this->json_data["error_mess"] = "this field is required";
            $this->json_data["error"] = 1;
        }
    }

}

$db_connect = new db_conn("localhost", "root", "", "x-dev_data");
$db_connect->db_cn();

$insert_data = new form($_POST["name"], $_POST["email"], $_POST["phone"], $_POST["budget"], $_POST["requir"]);
echo $insert_data->index();
header('Content-Type:application/json');
echo json_encode($insert_data->json_data);
?>