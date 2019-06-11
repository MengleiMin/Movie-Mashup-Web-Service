<?php 
    
   class db{
	
      private $dbhost = 'localhost';
      private $dbuser = 'root';
      private $dbpass = '123456';
      private $dbname='testdatabase';

	  
	  public function connect(){
		  $mysqli=mysqli_connect($this->dbhost,$this->dbuser,$this->dbpass,$this->dbname);
           if (mysqli_connect_error()) {
               die('Connect Error (' . mysqli_connect_errno() . ') '
            . mysqli_connect_error());
            }
			return $mysqli;
	  }
        
    }


?>