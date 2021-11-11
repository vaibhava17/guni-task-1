var latitude  = '';
var longitude = '';

var mention_users;


var login_hours_element  = '';
//var login_hours_interval = '';

var login_hours_interval = [];


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}







function cors_request(){

	$.ajax({
		type : "POST",
		headers: { 'Authorization': 'Bearer 4nvLN8+6yrYfiBDQ36uZrw15PwVMoAyctZ8YlFebA4mkTmHpOJv3efEuE33iIhLV7ICKjGdXMW/EYIP7VGY8AA==::dbf4b1c382d3a6c4351dfddec2722921' },
	    url : 'http://13.232.136.234/rapi/users/profile',
	    //url : 'http://13.232.136.234/apis/users/login',
	    success:function(result){

	    	var obj = jQuery.parseJSON(result);

	    	console.log(obj);
	    }	
	});     

}



//Live Location Start
function get_location() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(show_location, show_location_error);
  } 
  else { 
    toastr.error("Geolocation is not supported by this browser.");
  }

}

function show_location(position) {
  var location = 'latitude='+position.coords.latitude+'&longitude='+position.coords.longitude; 

  latitude  = position.coords.latitude;
  longitude = position.coords.longitude;

  $("#latitude").val(latitude);
  $("#longitude").val(longitude);

  $("#location").val(latitude+','+longitude);

  $("#live-location").val( parseFloat(latitude).toFixed(2) +','+parseFloat(longitude).toFixed(2));
}

function show_location_error(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
         toastr.error("User denied the request for Geolocation.");
         break;
    case error.POSITION_UNAVAILABLE:
         toastr.error("Location information is unavailable.");
         break;
    case error.TIMEOUT:
         toastr.error("The request to get user location timed out.");
         break;
    case error.UNKNOWN_ERROR:
         toastr.error("An unknown error occurred.");
         break;
  }
}
//Live Location End






function create_date_picker_range(i){

	$(document).ready(function () {

		$('#month_past_start'+i).datepicker({
		      format: "mm-yyyy",
		      viewMode: "months", 
		      minViewMode: "months",
		      endDate: '+0d',
		      autoclose: true,
		      clearBtn:true
		}).on('changeDate', function (selected) {
		      var minDate = new Date(selected.date.valueOf());
		       $('#month_past_end'+i).datepicker('setStartDate', minDate);

		       console.log('Min Date : '+minDate);
		});
		$('#month_past_start'+i).attr('readonly',true); 



		$('#month_past_end'+i).datepicker({
		    format: "mm-yyyy",
		    viewMode: "months", 
		    minViewMode: "months",
		    endDate: '+0d',
		    autoclose: true,
		    clearBtn:true
		}).on('changeDate', function (selected) {
		    var maxDate = new Date(selected.date.valueOf());
		    $('#month_past_start'+i).datepicker('setEndDate', maxDate);

		    console.log('Max Date : '+maxDate);
		});
		$('#month_past_end'+i).attr('readonly',true); 
	});	
}


	


$(document).ready(function () {

  var timezone_offset_minutes  = new Date().getTimezoneOffset();
  
  timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;

  console.log('timezone offset',timezone_offset_minutes);

	//disable inspect element start
	/*$(document).bind("contextmenu",function(e) {
	    e.preventDefault();
	});

	$(document).keydown(function(e){
	    if(e.which === 123){
	       return false;
	    }
	    else if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
		  return false;
		}
		else if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
		  return false;
		}
		else if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
			return false;
		}
		else if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
			return false;
		}
		else if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
		  return false;
		}
		else if(e.ctrlKey && e.shiftKey && e.keyCode == 'K'.charCodeAt(0)){
		  return false;
		}
	});*/
	//disable inspect element end

	//date_picker_options();

/*	setInterval(function(){ 
	    unread_notification_count();
	}, 300000);*/


	var i=1;



	$(document).on('change','#ex8' ,function(e){

			var msg_count = ($(this).val())*1000;

			var multiplier = 4.5;

			var price = (msg_count*multiplier)/100

			$("#message-price").val(price);
	});	


	$(document).on('change','.custom-file-input' ,function(e){ 

		if (e.target.files.length) {
            $(this).next('.custom-file-label').html(e.target.files[0].name);
        }
	});		

	


	$(document).on('change','#android_app' ,function(e){

		if (this.files && this.files[0]) {

			var data = new FormData();

            data.append('file', this.files[0]);
            data.append('allowed_ext', 'apk');
            data.append('file_type', 'application');

            $.ajax({
	        	type : "POST",
			    data : data,
			    cache: false,
	    		contentType: false,
	    		processData: false,
			    url  : site_url('xhr/settings/upload-android-apk'),
			    success:function(result){

			    	$('#loading').hide();

			    	var obj = jQuery.parseJSON(result);

			    	if (obj.success) {
			    		$("#android_app_link").val(obj.android_app_link);
			    	}
			    	else if (obj.error_404) {
						toastr.error(obj.error_404);
					}
					else if (obj.error) {
						toastr.warning(obj.error);
					}
			    }	

	        });

		}	
	});



	/******************************** Only Numeric Start ******************************************/ 
	$(document).on('keydown', '.numeric', function(e){-1!==$.inArray(e.keyCode,[8,9,46])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
	/******************************** Only Numeric End ******************************************/

	/******************************** Decimal Start ******************************************/ 
	$(document).on('keydown', '.decimal', function(e){-1!==$.inArray(e.keyCode,[8,9,46,110])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
	/******************************** Decimal End ******************************************/

	/******************************** Prevent 0 at begining Start ************************************/
	$(document).on('keyup','.no_zero_start' ,function(e){

	  if ( this.value.substr(0,1)=='0') {
	     this.value = this.value.substr(1);
	  }

	});
	/******************************** Prevent 0 at begining End ****************************************/ 



	var page_no = 1;
	$(document).on('click','.paginate_button' ,function(e){

		page_no = $(this).html();

		//alert(page_no);

	});




	$(document).on('click','#notification-btn' ,function(e){

    	$.ajax({
			type : "POST",
		    url : site_url('xhr/general/load-unread-notifications'),
		    success:function(result){

			    var obj = jQuery.parseJSON(result);

			    if (obj.success) {
			    	$("#notification-alert-list").html(obj.html);
			    }
			    else if (obj.error_404) {
					toastr.error(obj.error_404);
				}	
		    }	

		});

    });



    $(document).on('change','#_session_id' ,function(e){

    	var _session_id = $(this).val();

    	if (_session_id) {

    		$.ajax({
				type : "POST",
				data : '_session_id='+_session_id,
			    url : site_url('xhr/request/load-overtime-dates'),
			    success:function(result){

				    var obj = jQuery.parseJSON(result);

				    if (obj.success) {
				    	$("#overtime-date-hours").html(obj.overtime_dates);
				    }
				    else if (obj.error) {
						toastr.warning(obj.error);
					}
				    else if (obj.error_404) {
						toastr.error(obj.error_404);
					}	
			    }	

			});
    	}
    	else{
    		$("#overtime-date-hours").html('');
    	}

    	

    });


	$(document).on('change','.salary-part' ,function(e){

		salary_calculation();
 	});	

	$(document).on('change','#attendence_summary_month' ,function(e){

    	var month_year = $(this).val();

    	var array = month_year.split("-");

    	var month = array[0];
    	var year  = array[1];

    	var days_count = daysInMonth(month, year);

    	$("#attendence_summary_days_in_month").val(days_count);
    	$("#attendence_summary_days_present").attr('max', days_count);
    	$("#attendence_summary_days_absent").attr('max', days_count);
    	/*$("#attendence_summary_paid_for").attr('max', days_count);*/


    	get_attendence_summary_data();

    });

	$(document).on('change','#attendence_summary_late_count, #attendence_summary_shortfall_count' ,function(e){

		var attendence_summary_late_count      = $("#attendence_summary_late_count").val();

		var attendence_summary_shortfall_count = $("#attendence_summary_shortfall_count").val();

		var attendence_summary_deduction_days  = $("#attendence_summary_deduction_days").val();

		var attendence_summary_paid_for        = $("#attendence_summary_paid_for").val();

		$('#loading').show();

		$.ajax({
			type : "POST",
		    data : "attendence_summary_late_count="+attendence_summary_late_count+"&attendence_summary_shortfall_count="+attendence_summary_shortfall_count+"&attendence_summary_deduction_days="+attendence_summary_deduction_days+"&attendence_summary_paid_for="+attendence_summary_paid_for,
		    url : site_url('xhr/attendence/get-deduction-by-late-and-shortfall'),
		    success:function(result){

		    	$('#loading').hide();

			    var obj = jQuery.parseJSON(result);

			    if (obj.success) {
			    	$("#attendence_summary_deduction_days").val(obj.attendence_summary_deduction_days);

			    	$("#attendence_summary_paid_for").val(obj.attendence_summary_paid_for);
			    }
			    else if (obj.error) {
					toastr.warning(obj.error);
				}
			    else if (obj.error_404) {
					toastr.error(obj.error_404);
				}	
		    }	

		});	

    });




	$(document).on('change','#leave_type, .leave_duration' ,function(e){

		var leave_type       = $("#leave_type").val();
		var leave_duration   = $('.leave_duration:checked').val();
		var leave_apply_type = $("#leave_apply_type").val();
		

		if (leave_type=='casual' || leave_type=='earned') {
			$("#leave_duration_multiple").hide();

			if (leave_duration=='multiple') {
				$(".leave_duration").prop("checked", false);
			}
		}
		else{
			$("#leave_duration_multiple").show();
		}

		$('#loading').show();

		$.ajax({
			type : "POST",
		    data : "leave_duration="+leave_duration+"&leave_type="+leave_type+'&leave_apply_type='+leave_apply_type,
		    url : site_url('xhr/leave/date-by-leave-duration'),
		    success:function(result){

		    	$('#loading').hide();

			    var obj = jQuery.parseJSON(result);

			    if (obj.success) {
			    	$("#leave_date_area").html(obj.leave_date_area);
			    }
			    else if (obj.error_404) {
					toastr.error(obj.error_404);
				}
				else if (obj.error) {
					toastr.warning(obj.error);
				}	
		    }	

		});	

	});


	/********************************** Ajax Submit Start ********************/
    $(document).on("submit", '.xhr_form', function(e) { 

    	e.preventDefault();

		unsaved = true;
		
		$('#loading').show();
		var submit_id = $(this).attr('id');
		var action    = $(this).attr('action');

		var url = site_url('xhr/'+action);
		var submit_btn_content = $('#'+submit_id+' button[type="submit"]').html();

		$('#'+submit_id+' button[type="submit"]').html("<i class='fa fa-spinner fa-spin'></i> Please Wait...");


		var form_data = new FormData(this);


		if ($('.xhr_form #base64_img_data').length) {

			var base64_img_data = $('.xhr_form #base64_img_data').attr('src');

			var block = base64_img_data.split(";");

			if (block[0] && block[1]) {
				var contentType = block[0].split(":")[1];// In this case "image/gif"
				// get the real base64 content of the file
				var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

				// Convert it to a blob to upload
				var blob = b64toBlob(realData, contentType);

				var fileOfBlob = new File([blob], 'selfie.png');

				//form_data.append("base64_img", blob);

				form_data.append("base64_img", fileOfBlob);
			}
			
		}

		$.ajax({
				type : "POST",
				data : form_data,
				contentType: false,      
			    cache: false,             
			    processData:false, 
				url  : url,
				success : function(response){
					$('#loading').hide();

					//$('html, body, .modal').animate({ scrollTop: 0 }, 600);
					console.log(response);
					var obj = jQuery.parseJSON (response);

					//Success Response Start
					if (obj.success) {

						toastr.success(obj.success);

						if (obj.call_method) {
							if (typeof obj.call_method === "function") {
								eval(obj.call_method);
							}	
				  		}


				  		if (obj.exe_code) {
				  			eval(obj.exe_code);
				  		}

						if (!obj.not_disabled) {
							$('#'+submit_id+' button[type="submit"]').attr("disabled", "disabled");

							//$('#'+submit_id+' button[type="submit"]').blur();
						}


						var no_error = obj.no_error;
					  	  $.each(no_error, function(key, value){
						  	  $("#"+submit_id+" #"+key+"_error").html('');
						  	  
						  	  if (obj.clear_value) {
						  	  	  $("#"+submit_id+" input[name='"+key+"']").val('');

						  	  	  $("#"+submit_id+" textarea").val('');	

						  	  	  //CKEDITOR.instances.ckeditor.setData('');
						  	  }
						  	  
						  	  //$('#'+submit_id+' input[name='+key+']').removeAttr('style');
						  	  //$('#'+submit_id+' select[name='+key+']').removeAttr('style');

					  	});

					  	$("#"+submit_id+" .show_file_name").html('');

					  	if (obj.add_user_id_href) {
					  		$("#add_user_id_href").attr('href', obj.add_user_id_href);
					  	}

					  	if (obj.old_tab && obj.new_tab) {
					  		show_next_tab(obj.old_tab, obj.new_tab);
					  	}
					  	else if (obj.close) {
					  		$("#"+submit_id+"-modal").modal('hide');

					  		if (obj.reload && obj.time) {
					  			window.setTimeout(function(){location.reload();}, obj.time);
					  		}

					  		if (obj.new_modal) {
					  			open_modal(obj.modal_name, obj.modal_data);
					  		}

					  		if (obj.call_method) {
					  			eval(obj.call_method);
					  		}

					  		//dataTable.clear().draw();

					  		$(".paginate_button:contains('"+page_no+"')").click();
						    
					  	}
					  	else if (obj.redirect && obj.time) {
					  		window.setTimeout(function(){window.location.href = obj.redirect;}, obj.time);
					  	}
					  	else if(obj.redirect){
					  		$(location).attr("href", obj.redirect); 
					  	}
					  	else if(obj.time){
					  		window.setTimeout(function(){location.reload();}, obj.time);
					  	}
					  	else if(obj.reload){
					  		location.reload();
					  	}
 
					}
					//Success Response End

					//Not Success Response Start
					else if(obj.not_success){
						
						toastr.error(obj.not_success);

						var no_error = obj.no_error;
					  	  $.each(no_error, function(key, value){
						  	  $("#"+submit_id+" #"+key+"_error").html('');	
						  	 // $('#'+submit_id+' input[name='+key+']').removeAttr('style');
						  	  //$('#'+submit_id+' select[name='+key+']').removeAttr('style');
					  	});
					}
					//Not Success Response End

					//Validation Error Response Start
					else if (obj.error) {
						//console.log(xhr.getResponseHeader(400));

						toastr.warning(obj.common_error_msg);

						  $.each(obj.error, function(key, value){
						  	  if (obj.error[key]) {
						  	  	 $("#"+submit_id+" #"+key+"_error").html(obj.error[key]);
						  	  	 //$('#'+submit_id+' input[name='+key+']' ).attr('style', 'border-bottom: solid 1px red');	
						  	  	 //$('#'+submit_id+' select[name='+key+']' ).attr('style', 'border-bottom: solid 1px red');	
						  	  }
						  	  else{
						  	  	 $("#"+submit_id+" #"+key+"_error").html('');	
						  	  	 //$('#'+submit_id+' input[name='+key+']').removeAttr('style');
						  	  	 //$('#'+submit_id+' select[name='+key+']').removeAttr('style');
						  	  }
					  	  });

					  	 // alert(JSON.stringify(obj.error));
					}
					//Validation Error Response End

					//404 Error Response Start
					else if(obj.error_404){

						toastr.error(obj.error_404);

						var no_error = obj.no_error;
					  	  $.each(no_error, function(key, value){
						  	  $("#"+submit_id+" #"+key+"_error").html('');	
						  	  //$('#'+submit_id+' input[name='+key+']').removeAttr('style');
						  	  //$('#'+submit_id+' select[name='+key+']').removeAttr('style');
					  	});

					  	if (obj.redirect && obj.time) {
					  		window.setTimeout(function(){window.location.href = obj.redirect;}, obj.time);
					  	}  
					}
					//404 Error Response End

					$('#'+submit_id+' button[type="submit"]').html(submit_btn_content);
				},

				
		});

    });	
    /********************************** Ajax Submit End ********************/





    $(document).on("keypress", '.small_alpha', function(e) { 
	    if (e.keyCode!= 8 && e.keyCode!= 46) {
	        var regex = new RegExp("^[a-z]+$");
	        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	        if (regex.test(str)) {
	            return true;
	        }

	        e.preventDefault();
	        return false;
	    }
	    return true;
	}); 

});

function chooseFile(id){
	$("#"+id).click();
}



/******************************** Show Password Start ************************************/
function show_password(btn_id, pass_field){
    var fieldtype = pass_field.attr('type');

    if (fieldtype == 'password') {
        pass_field.attr('type', 'text');
        $('#'+btn_id).removeClass('fa-eye');
        $('#'+btn_id).addClass('fa-eye-slash');
        $('#'+btn_id).attr('title', 'Hide Password');

        $('#'+btn_id).attr('src', base_url('assets/images/upload/eye-close.png'));
    }
    else{
        pass_field.attr('type', 'password');
        $('#'+btn_id).addClass('fa-eye');
        $('#'+btn_id).removeClass('fa-eye-slash');
        $('#'+btn_id).attr('title', 'Show Password');

        $('#'+btn_id).attr('src', base_url('assets/images/upload/eye-open.png'));
    }
}
/******************************** Show Password End ************************************/


function upload_file(input, allowed_ext, img_src='') {

	var file_input_id = input.id;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        if (img_src) {
        	reader.onload = function (e) {
	            $('#'+img_src).attr('src', e.target.result);
	        }
        	reader.readAsDataURL(input.files[0]);
        }

        /*$('#loading').show();

        var data = new FormData();

        data.append('file', input.files[0]);
        data.append('allowed_ext', allowed_ext);

        $.ajax({
        	type : "POST",
		    data : data,
		    cache: false,
    		contentType: false,
    		processData: false,
		    url  : site_url('xhr/general/upload-file'),
		    success:function(result){

		    	$('#loading').hide();

		    	var obj = jQuery.parseJSON(result);

		    	if (obj.success) {
		    		$("#"+file_input_id+"_id").val(obj.file_id);
		    	}
		    	else if (obj.error_404) {
					toastr.error(obj.error_404);
				}
				else if (obj.error) {
					toastr.warning(obj.error);
				}
		    }	

        });	*/
    }
} 

function open_modal(link, data, css_link, js_link){
	$('#loading').show();

	var url = site_url('xhr/'+link+'-modal');

	if (css_link) {
		$('head').append('<link rel="stylesheet" type="text/css" href="'+css_link+'">');
	}

	if (js_link) {
		$('head').append('<script src="'+js_link+'"></script>');
	}

	$.ajax({
		type : "POST",
		data : data,
		url  : url,
		success:function(result){

			$('#loading').hide();

			var obj = jQuery.parseJSON(result);

			if (obj.success) {

				if ($("#"+obj.modal_id).length!=0) {
					$("#"+obj.modal_id).html('');
				}
					
				jQuery('body').prepend(obj.modal);

				$('.selectpicker').selectpicker('refresh');
				//$('.selectpicker').selectpicker('refresh');


				/*if ($("#editor1").length) {
					CKEDITOR.replace( 'editor1', {
						customConfig: base_url('assets/js/ckeditor-config.js')
					});
				}

				  date_functions();*/

				if(obj.old_modal_id){
					$('#'+obj.old_modal_id).modal('hide');
				}
				

			    $("#"+obj.modal_id).modal('show');

			    if (obj.call_method) {
		  			eval(obj.call_method);
		  		}

			    

			}
			else if (obj.error_404) {
				toastr.error(obj.error_404);
			}
			else if (obj.error) {
				toastr.warning(obj.error);
			}
			
		}
	});
}



function execute(link, data){
   $('#loading').show();

	var url = site_url('xhr/'+link);

	$.ajax({
		type : "POST",
		data : data,
		url  : url,
		success:function(result){

			$('#loading').hide();

			var obj = jQuery.parseJSON(result);

			if (obj.success) {

				if (obj.iframe_id) {
					$("#"+obj.iframe_id).attr('src', obj.iframe_url);

					$('.chat-head img').attr('src', base_url('assets/images/angle_down.png'));

					$("#rc-chat-body").show();
				}	
				else if (obj.data) {

					var details = obj.details;

					$.each(details, function(key, value){
					  	 
					  	if ($("#"+key).is('input')) {

					  		$("#"+key).val(value);
					  	} 
						
				  	});

				  	if (obj.html) {

						$("#"+obj.html_id).html('');

						$("#"+obj.html_id).html(obj.html);
					}
				}
				else if (obj.html) {

					$("#"+obj.html_id).html('');

					$("#"+obj.html_id).html(obj.html);
				}
				else if (obj.external_link) {
					
					var win = window.open(obj.external_link, "_blank");
					if (win) {
					    //Browser has allowed it to be opened
					    win.focus();
					} else {
					    //Browser has blocked it
					    alert('Please allow popups for this website');
					}
				}
				else{
					toastr.success(obj.success);
				}

				

				if (obj.close) {
			  		$("#"+obj.modal_id).modal('hide');

			  		if (obj.reload && obj.time) {
			  			window.setTimeout(function(){location.reload();}, obj.time);
			  		}

			  		if (obj.call_method) {
			  			eval(obj.call_method);
			  		}
				    
			  	}
			  	else if (obj.redirect && obj.time) {
					window.setTimeout(function(){window.location.href = obj.redirect;}, obj.time);
			  	}
			  	else if(obj.redirect){
			  		$(location).attr("href", obj.redirect); 
			  	}
			  	else if(obj.time){
			  		window.setTimeout(function(){location.reload();}, obj.time);
			  	}
			  	else if(obj.reload){
			  		location.reload();
			  	}
			}
			else if (obj.error_404) {
				toastr.error(obj.error_404);
			}
			else if (obj.error) {
				toastr.warning(obj.error);
			}
		}
	});
}





function mail_list(){

	$('#mail-logs-list').DataTable().destroy();

	var url = site_url('xhr/settings/mail-logs-list');

	dataTable = $('#mail-logs-list').DataTable({
    dom: 'lBfrtip',
    responsive: true,
    //ordering : false,

    columns : [
                {orderable : true },
                {orderable : true },
                {orderable : true },
                {orderable : true },
                {orderable : true },
                {orderable : false }
  	],
  	order: [[ 0, "desc" ]],

    lengthMenu: [[10, 25, 100], [10, 25, 100]],
    pageLength: 10,
    columnDefs: [
	    { "width": "5%", "targets": 0 },
	],
    buttons: [
              {
                  extend: 'print',
                  text: '<button class="btn btn-primary btn-sm" ><i class="fa fa-print fa-x5"> Print</i></button>',
                  autoPrint: false,
                  exportOptions: {
                      columns: [0,1,2,3,4]
                  }
              },

              {
                  extend: 'excelHtml5',
                  text: '<button class="btn btn-success btn-sm"><i class="fa fa-file-excel-o fa-x5"> Excel</i></button>',
                  exportOptions: {
                      columns: [0,1,2,3,4]
                  }
              },

              {
                  extend: 'pdfHtml5',
                  text: '<button class="btn btn-danger btn-sm"><i class="fa fa-file-pdf-o fa-x5"> PDF</i></button>',
                  exportOptions: {
                      columns: [0,1,2,3,4]
                  }
              }
    ],

	"processing": true,
	"serverSide": true,
	"ajax":{
      	url : url, // json datasource
      	type: "post",  // method  , by default get
      	error: function(){  // error handling
	        $(".mail-logs-list-error").html("");
	        $("#mail-logs-list-grid").append('<tbody class="current-donors-list-error"><tr><th colspan="6">No data found</th></tr></tbody>');
	        $("#mail-logs-list_processing").css("display","none");
        
      	}
	},

    "language": {
                  processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading..n.</span> '
                }



		});
}

function member_list(){

	$('#member-list').DataTable().destroy();

	var member_status = $("#member_status").val();
	var user_role_id  = $("#user_role_id").val();

	var url = site_url('xhr/team-members/team-member-list?member_status='+member_status+'&user_role_id='+user_role_id);

	dataTable = $('#member-list').DataTable({
    dom: 'lBfrtip',
    responsive: true,
    ordering : false,


    lengthMenu: [[10, 25, 100], [10, 25, 100]],
    pageLength: 10,
    columnDefs: [
	    { "width": "5%", "targets": 0 },
	],
    buttons:[
              	{
                	extend: 'print',
                	text: '<button class="btn btn-primary btn-sm" ><i class="fa fa-print fa-x5"> Print</i></button>',
                	autoPrint: false,
                	exportOptions: {
                    	columns: [0,1,2,3,4]
                  	}
              	},

              	{
                	extend: 'excelHtml5',
                	text: '<button class="btn btn-success btn-sm"><i class="fa fa-file-excel-o fa-x5"> Excel</i></button>',
                	exportOptions: {
                    	columns: [0,1,2,3,4]
                  	}
              	},

              	{
                	extend: 'pdfHtml5',
                	text: '<button class="btn btn-danger btn-sm"><i class="fa fa-file-pdf-o fa-x5"> PDF</i></button>',
                	exportOptions: {
                    	columns: [0,1,2,3,4]
                  	}
              	}
    ],

	"processing": true,
	"serverSide": true,
	"ajax":{
      	url : url, // json datasource
      	type: "post",  // method  , by default get
      	error: function(){  // error handling
	        $(".member-list-error").html("");
	        $("#member-list-grid").append('<tbody class="member-list-error"><tr><th colspan="5">No data found</th></tr></tbody>');
	        $("#member-list_processing").css("display","none");
      	}
	},

    "language": {
                  processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading..n.</span> '
                }
	});
}

				


function notification_list(){

	$('#notification-list').DataTable().destroy(); 

	var url = site_url('xhr/notifications/notification-list'); 

	dataTable = $('#notification-list').DataTable({
    dom: 'lfrtip',
    responsive: true,
    ordering : false,

    lengthMenu: [[10, 25, 100], [10, 25, 100]],
    pageLength: 10,
    columnDefs: [
	    { "width": "5%", "targets": 0 },
	],

	"processing": true,
	"serverSide": true,
	"ajax":{
      	url : url, // json datasource
      	type: "post",  // method  , by default get
      	error: function(){  // error handling
	        $(".notification-list").html("");
	        $("#notification-list-grid").append('<tbody class="leave-applications-error"><tr><th colspan="3">No data found</th></tr></tbody>');
	        $("#notification-list_processing").css("display","none");
      	}
	},

    "language": {
                  processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading..n.</span> '
                }
		});
	
}




function ws_logs(){

	$('#ws-logs').DataTable().destroy(); 

	var ws_action  = $("#ws_action").val();

	var app_type   = $("#app_type").val();

	var ip_address = $("#ip_address").val();

	var url = site_url('xhr/logs/ws-logs?ws_action='+ws_action+'&app_type='+app_type+'&ip_address='+ip_address); 

	dataTable = $('#ws-logs').DataTable({
    dom: 'lfrtip',
    responsive: true,
    ordering : false,

    pageLength: 10,

	"processing": true,
	"serverSide": true,
	"ajax":{
      	url : url, // json datasource
      	type: "post",  // method  , by default get
      	error: function(){  // error handling
	        $(".ws-logs").html("");
	        $("#ws-logs-grid").append('<tbody class="ws-logs-error"><tr><th colspan="9">No data found</th></tr></tbody>');
	        $("#ws-logs_processing").css("display","none");
      	}
	},

    "language": {
                  processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading..n.</span> '
                }
		});
	
}




function session_logs(){

	$('#session-logs').DataTable().destroy(); 

	var _user_id   = $("#_user_id").val();

	var token_device_type = $("#token_device_type").val();

	var token_is_valid = $("#token_is_valid").val();

	var url = site_url('xhr/logs/session-logs?_user_id='+_user_id+'&token_device_type='+token_device_type+'&token_is_valid='+token_is_valid); 

	dataTable = $('#session-logs').DataTable({
    dom: 'lfrtip',
    responsive: true,
    ordering : false,

    lengthMenu: [[10, 25, 100], [10, 25, 100]],
    pageLength: 10,

	"processing": true,
	"serverSide": true,
	"ajax":{
      	url : url, // json datasource
      	type: "post",  // method  , by default get
      	error: function(){  // error handling
	        $(".session-logs").html("");
	        $("#session-logs-grid").append('<tbody class="session-logs-error"><tr><th colspan="5">No data found</th></tr></tbody>');
	        $("#session-logs_processing").css("display","none");
      	}
	},

    "language": {
                  processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading..n.</span> '
                }
		});
	
}



function mail_logs(){

	$('#mail-logs').DataTable().destroy(); 


	var url = site_url('xhr/logs/mail-logs'); 

	dataTable = $('#mail-logs').DataTable({
    dom: 'lfrtip',
    responsive: true,
    ordering : false,

    lengthMenu: [[10, 25, 100], [10, 25, 100]],
    pageLength: 10,

	"processing": true,
	"serverSide": true,
	"ajax":{
      	url : url, // json datasource
      	type: "post",  // method  , by default get
      	error: function(){  // error handling
	        $(".mail-logs").html("");
	        $("#mail-logs-grid").append('<tbody class="mail-logs-error"><tr><th colspan="8">No data found</th></tr></tbody>');
	        $("#mail-logs_processing").css("display","none");
      	}
	},

    "language": {
                  processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading..n.</span> '
                }
	});
	
}





function time_to_seconds(str) {

	str = String(str);
	//console.log(str);
    var p = str.split(':'),
        s = 0, m = 1;
        n = 1;
    //console.log('p.length => '+p.length);
    while (p.length > 0) {
    	n +=1;
        s += m * parseInt(p.pop(), 10);
        //console.log('n = '+n);
        //console.log('s = '+s);
        m *= 60;
    }
    //console.log('s final = '+s);

    return s;
}


function seconds_to_time(seconds){
	var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60); 
    var seconds = Math.floor(seconds % 60);
    return (hours < 10 ? "0" + hours : hours) + ":" + 
           (minutes < 10 ? "0" + minutes : minutes) + ":" + 
           (seconds < 10 ? "0" + seconds : seconds);
}





function printPageArea(areaID){
    var printContent = document.getElementById(areaID);
    var WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
}


function go_back(){
	window.history.back();
}



function time_picker_options(){

	$('.timepicker').timepicker({
	    timeFormat: 'HH:mm',
	    interval: 1,
	    minTime: '9',
	    maxTime: '23:59',
	    defaultTime: '9',
	    startTime: '9:00',
	    dynamic: true,
	    dropdown: true,
	    scrollbar: true
	});


	$('#start_time').timepicker({
	    timeFormat: 'HH:mm',
	    interval: 1,
	    minTime: '9',
	    maxTime: '23:59',
	    defaultTime: '9',
	    startTime: '9:00',
	    dynamic: true,
	    dropdown: true,
	    scrollbar: true
	});


	$('#end_time').timepicker({
	    timeFormat: 'HH:mm',
	    interval: 1,
	    minTime: '9',
	    maxTime: '23:59',
	    defaultTime: '18',
	    startTime: '9:00',
	    dynamic: true,
	    dropdown: true,
	    scrollbar: true
	});
}


function date_picker_options(){

	$('.upto_previous_date').datepicker({
        format: "dd-mm-yyyy",
        endDate: '-1d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true
    });
    $('.upto_previous_date').attr('readonly',true); 


    $('.attendence_date').datepicker({
        format: "dd-mm-yyyy",
        endDate: '-1d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        daysOfWeekDisabled:'0'
    });
    $('.attendence_date').attr('readonly',true); 


	$('.no_future_date').datepicker({
        format: "dd-mm-yyyy",
        endDate: '+0d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true
    });
    $('.no_future_date').attr('readonly',true); 


    $('.all_date').datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
        clearBtn:true,
        todayHighlight:true
    });
    $('.all_date').attr('readonly',true);


   /* $(".all_time").datetimepicker({
    	format: 'yyyy-mm-dd hh:ii'
    });*/

    /*$('.all_time').datepicker({
        format: "hh:ii",
        autoclose: true,
        clearBtn:true
    });*/
    $('.all_time').attr('readonly',true);


    $(".no_previous_date").datepicker({ 
       format: "dd-mm-yyyy",
       startDate: new Date(),
       autoclose: true,
       clearBtn:true,
       todayHighlight:true
    });
    $('.no_previous_date').attr('readonly',true);


    $('.upto_last_month').datepicker({
        format: "mm-yyyy",
        viewMode: "months", 
        minViewMode: "months",
        endDate: '-1m',
        autoclose: true,
        clearBtn:true
    });
    $('.upto_last_month').attr('readonly',true); 


    $('.no_future_month').datepicker({
        format: "mm-yyyy",
        viewMode: "months", 
        minViewMode: "months",
        endDate: '+0d',
        autoclose: true,
        clearBtn:true
    });
    $('.no_future_month').attr('readonly',true); 

    $('.all_month').datepicker({
      format: "mm-yyyy", // Notice the Extra space at the beginning
      viewMode: "months", 
      minViewMode: "months",
      autoclose: true,
      clearBtn:true
    });
    $('.all_month').attr('readonly',true);



    $('.no_future_year').datepicker({
	    format: " yyyy", // Notice the Extra space at the beginning
	    viewMode: "years", 
	    minViewMode: "years",
	    endDate: '+0d',
	    autoclose: true,
	    clearBtn:true
    });
    $('.no_future_year').attr('readonly',true);


    $('.all_year').datepicker({
       format: " yyyy", // Notice the Extra space at the beginning
       viewMode: "years", 
       minViewMode: "years",
       autoclose: true,
       clearBtn:true
    });
    $('.all_year').attr('readonly',true);


    $('#fin_from_year').datepicker({
       format: " yyyy", // Notice the Extra space at the beginning
       viewMode: "years", 
       minViewMode: "years",
       autoclose: true, 
       clearBtn:true
    });
    $('#fin_from_year').attr('readonly',true);

    $('#fin_to_year').datepicker({
       format: " yyyy", // Notice the Extra space at the beginning
       viewMode: "years", 
       minViewMode: "years",
       autoclose: true,
       clearBtn:true
    });
    $('#fin_to_year').attr('readonly',true);


    $('.cl_date').datepicker({
        format: "dd-mm-yyyy",
        startDate: casual_leave_start_date+'d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        endDate:end_date,
        daysOfWeekDisabled:'0'
    });
    $('.cl_date').attr('readonly',true); 

    $('.pl_date').datepicker({
        format: "dd-mm-yyyy",
        startDate: planned_leave_start_date+'d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        endDate:end_date,
        daysOfWeekDisabled:'0'
    });
    $('.pl_date').attr('readonly',true); 

    $('.any_date').datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        daysOfWeekDisabled:'0'
    });
    $('.any_date').attr('readonly',true);


    $('.cl_date_half_day').datepicker({
        format: "dd-mm-yyyy",
        startDate: casual_leave_start_date+'d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        endDate:end_date,
        daysOfWeekDisabled:'06'
    });
    $('.cl_date_half_day').attr('readonly',true);

    
    $('.pl_date_half_day').datepicker({
        format: "dd-mm-yyyy",
        startDate: planned_leave_start_date+'d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        endDate:end_date,
        daysOfWeekDisabled:'06'
    });
    $('.pl_date_half_day').attr('readonly',true);

    $('.any_date_half_day').datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        daysOfWeekDisabled:'06'
    });
    $('.any_date_half_day').attr('readonly',true);


    


     $('#event_start_date').datepicker({
        format: "dd-mm-yyyy",
        startDate: '+1d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        endDate:end_date,
        daysOfWeekDisabled:'0'
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
         $('#event_end_date').datepicker('setStartDate', minDate);
    });
    $('#event_start_date').attr('readonly',true); 


    $('#event_end_date').datepicker({
        format: "dd-mm-yyyy",
        startDate: '+1d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        endDate:end_date,
        daysOfWeekDisabled:'0'
    }).on('changeDate', function (selected) {
        var maxDate = new Date(selected.date.valueOf());
        $('#event_start_date').datepicker('setEndDate', maxDate);
    });
    $('#event_end_date').attr('readonly',true); 


    $('#start_date').datepicker({
        format: "dd-mm-yyyy",
        startDate: planned_leave_start_date+'d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        endDate:end_date,
        daysOfWeekDisabled:'0'
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
         $('#end_date').datepicker('setStartDate', minDate);
    });

    $('#start_date').attr('readonly',true); 


     $('#end_date').datepicker({
        format: "dd-mm-yyyy",
        startDate: planned_leave_start_date+'d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        endDate:end_date,
        daysOfWeekDisabled:'0'
    }).on('changeDate', function (selected) {
        var maxDate = new Date(selected.date.valueOf());
        $('#start_date').datepicker('setEndDate', maxDate);
    });
    $('#end_date').attr('readonly',true); 


    $('#previous_start_date').datepicker({
        format: "dd-mm-yyyy",
        endDate: '+0d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
         $('#previous_end_date').datepicker('setStartDate', minDate);
    });

    $('#previous_start_date').attr('readonly',true); 


     $('#previous_end_date').datepicker({
        format: "dd-mm-yyyy",
        endDate: '+0d',
        autoclose: true,
        clearBtn:true,
        todayHighlight:true
    }).on('changeDate', function (selected) {
        var maxDate = new Date(selected.date.valueOf());
        $('#previous_start_date').datepicker('setEndDate', maxDate);
    });
    $('#previous_end_date').attr('readonly',true); 



    $('#any_start_date').datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
        clearBtn:true,
        todayHighlight:true,
        daysOfWeekDisabled:'0'
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#any_end_date').datepicker('setStartDate', minDate);
    });
    $('#any_start_date').attr('readonly',true); 


     $('#any_end_date').datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
        clearBtn:true,
        daysOfWeekDisabled:'0'
    }).on('changeDate', function (selected) {
        var maxDate = new Date(selected.date.valueOf());
        $('#any_start_date').datepicker('setEndDate', maxDate);
    });
    $('#any_end_date').attr('readonly',true); 





    $('#project-start-date').datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
        clearBtn:true,
        todayHighlight:true
    }).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
         $('#project-end-date').datepicker('setStartDate', minDate);
    });

    $('#project-start-date').attr('readonly',true);

     $('#project-end-date').datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
        clearBtn:true,
        todayHighlight:true
    }).on('changeDate', function (selected) {
        var maxDate = new Date(selected.date.valueOf());
        $('#project-start-date').datepicker('setEndDate', maxDate);
    });
    $('#project-end-date').attr('readonly',true);
}


function daysInMonth (month, year) { 
    return new Date(year, month, 0).getDate(); 
}


function desktop_notification_permission(){

	if (!("Notification" in window)) {
	    toastr.error("This browser does not support desktop notification");
	}

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      toastr.error("Your desktop notification is already enabled.");
      $("#desktop_notification_btn").hide();
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
	    if (permission === "granted") {
	        toastr.success("Desktop notification is enabled successfully.");
	        $("#desktop_notification_btn").hide();
	    }
	    else if(permission === "denied"){
	    	toastr.error("You have blocked your desktop notification. You won't receive any further updates.");
	        $("#desktop_notification_btn").show();
	    }
      });
    }	
}	






function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}


function unread_notification_count(){

	$.ajax({
		type : "POST",
	    url : site_url('xhr/general/unread-notification-count'),
	    success:function(result){

		    var obj = jQuery.parseJSON(result);

		    if (obj.success) {

		    	if (obj.unread_notification_count!=0) {

		    		$("#notification-bell-count").html(obj.unread_notification_count);

		    		if (Notification.permission === "granted") {
		    			var notifications = obj.notifications;

			    		if (notifications) {
			    			for (var i = 0; i < notifications.length; i++) {
			    				var title = notifications[i]['user_first_name']+' '+notifications[i]['user_last_name'];

			    				var options = {
								    body: notifications[i]['notification_title'],
								    icon: base_url(notifications[i]['user_image']),
								    image: base_url('assets/images/logo-notifications.jpg'),
								    vibrate: [200, 100, 200],
								    tag: notifications[i]['_notification_id']
								};

								var notification = new Notification(title, options); 

								var _notification_id = notifications[i]['_notification_id'];
								var action_type      = notifications[i]['notification_action_type'];
								var link             = notifications[i]['notification_modal_link'];
								var target           = notifications[i]['notification_modal_link_target'];
								var modal_id         = notifications[i]['notification_modal_id'];
								var modal_data       = notifications[i]['notification_modal_data'];

								notification.onclick = function(event) {
									event.preventDefault(); 

									if (action_type=='link') {
										window.open(base_url(link),target);
									}
									else if(action_type=='modal'){
										open_modal(modal_id, modal_data);
									}

									$.ajax({
										type : "POST",
									    url : site_url('xhr/general/read-notification'),
									    data:'_notification_id='+_notification_id,
									    success:function(result){
									    	var obj = jQuery.parseJSON(result);

									    	console.log(obj.success);
									    }	
									});	
								}	
			    			}
			    		}
		    		}	
		    		
		    	}
		    	else{
		    		$("#notification-bell-count").html('');
		    	}
		    	
		    }
		    else if (obj.error) {
		    	if (ctrl!='login' && ctrl!='forgot_password' && ctrl!='reset_password') {

		    		window.location.href = site_url('login');
		    	}
		    }
	    }	

	});
}


function load_notifications(){
	$.ajax({
		type : "POST",
	    url : site_url('xhr/general/load-unread-notifications'),
	    success:function(result){

		    var obj = jQuery.parseJSON(result);

		    if (obj.success) {
		    	$("#notification-alert-list").html(obj.html);
		    }
		    else if (obj.error_404) {
				toastr.error(obj.error_404);
			}	
	    }	
	});
}




function activa_tab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}; 


function show_next_tab(old_tab, new_tab){

	$('.nav-tabs a[href="#' + new_tab + '"]').removeClass('disabled');

	activa_tab(new_tab);

	$('.nav-tabs a[href="#' + old_tab + '"]').addClass('disabled');
}


function prependZero(number) {
    if (number < 10)
        return "0" + number;
    else
        return number;
}



function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}


function removeTags(str) {
  if ((str===null) || (str===''))
  return false;
  else
  str = str.toString();
  return str.replace( /(<([^>]+)>)/ig, '');
}




function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

