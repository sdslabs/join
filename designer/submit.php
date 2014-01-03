<?
	$link=mysql_connect('localhost','USER','PASSWORD');
	mysql_select_db('DATABASE');
	$name=htmlentities($_POST['name'],ENT_QUOTES);
		//Check ppl from directly opening submitting
		if(!$name)
			die("Either first name not filled or file size is too large, reduce the number of images or mail at contact@sdslabs.co.in <a href='http://join.sdslabs.co.in'>Back</a>");
	$branch=htmlentities($_POST['branch'],ENT_QUOTES);
	$enrollno=htmlentities($_POST['enrollno'],ENT_QUOTES);
	$email=htmlentities($_POST['email'],ENT_QUOTES);
	$applying=htmlentities($_POST['applyingfor'],ENT_QUOTES);
	$phone=htmlentities($_POST['phoneno'],ENT_QUOTES);
	$feedback=htmlentities($_POST['feedback'],ENT_QUOTES);
	$sknown=htmlentities($_POST['sknown'],ENT_QUOTES);
	$designed=htmlentities($_POST['designed'],ENT_QUOTES);
	$allowed_filetypes = array('rar','zip'); // These will be the types of file that will pass the validation.
	$max_filesize =20000000; // Maximum filesize in BYTES (currently 5MB).
	$upload_path = './uploads/'; // The place the files will be uploaded to (currently a 'files' directory
	$filename =$_FILES['fileInput']['name']; // Get the name of the file (including file extension).
	$pieces=explode('.',$filename);
	$r=count($pieces);
	$ext=$pieces[$r-1];// Get the extension from the filename.
	// Check if the filetype is allowed, if not DIE and inform the user.
	if(!in_array($ext,$allowed_filetypes))
		die("A valid portfolio in the form of zip or rar file is mandatory for designers<br/><a href='http://sdslabs.co.in/designers/form.html'>Back</a>");
   //Now check the filesize, if it is too large then DIE and inform the user.
    if(filesize($_FILES['fileInput']['tmp_name']) > $max_filesize)
   	    die("The file you attempted to upload is too large. <a href='http://sdslabs.co.in/designers/form.html'>Back</a>");
   	// Check if we can upload to the specified path, if not DIE and inform the user.
	if(!is_writable($upload_path))
		die("You cannot upload to the specified directory, please CHMOD it to 777. <a href='http://sdslabs.co.in/designers/form.html'>Back</a>");
   // Upload the file to your specified path.
    if(move_uploaded_file($_FILES['fileInput']['tmp_name'],$upload_path.$enrollno.'.'.$ext)){
		$src=$upload_path.$name.'.'.$ext;
	}
	else
		die('No/Invalid file uploaded');
	$q="INSERT INTO designers(name,branch,enroll,email,projects,file,phone,feedback) values('$name','$branch','$enrollno','$email','$designed','$src','$phone','$feedback') ";
	mysql_query($q,$link);
	mysql_close();
	header("location:submitted.php"); 				
?>
