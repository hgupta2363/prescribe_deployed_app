var app=require('express')()
const cors=require('cors')
const bodyParser=require('body-parser');
const ejs=require("ejs")
const path=require("path")
const Razorpay=require("razorpay")
const crypto = require("crypto");
const url=require("url")
const request=require("request")
port=process.env.PORT || 5000;
var firebase = require("firebase");
require('dotenv').config();

const fetch=require('fetch').fetchUrl
var jwt = require('jsonwebtoken');



const key_id=process.env.KEY_ID
const key_secret=process.env.KEY_SECRET
var data={}
app.use(cors());
var dets=[]
// var serviceAccount = require('C:/Users/chdno/Desktop/All desktop Files/PresAssignment/my-app/backend/prescribetask-firebase-adminsdk-jh3c7-d97cd99717.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://speech-f3243.firebaseio.com/"
// });
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
const config = {
    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: "speech-f3243.firebaseapp.com",
    databaseURL: "https://speech-f3243.firebaseio.com",
    projectId: "speech-f3243",
    storageBucket: "speech-f3243.appspot.com",
    messagingSenderId: "26831214028",
    appId: process.env.API_ID
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database= firebase.database();
    // if(process.env.NODE_ENV==='production')
    // {
    //     app.use(express.static('build'));
    //     app.get('*',()=>{
    //         res.sendFile(path.join(__dirname,'client','build','index.html')); //relative path
    //     })
    // }



  var instance = new Razorpay({
    key_id:key_id ,
    key_secret:key_secret
  })

// var expressSession=require('express-session')
// app.use(expressSession({secret:'max',saveUninitialised:false,re save:false}))
// app.get('/',(req,res,next)=>{
//     usersRef.ref()on('value',snap=>{
//       res.send(snap.val())
//     })
// })
app.get('/Zoom_Token/:code/:token',(req,res,next)=>{
    var finalData;
    fetch(`https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.params.code}&redirect_uri=http://localhost:3000/zoom_token`,
    {   method:'POST',
     
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Basic ${req.params.token}`,
        
      }
    },function(error,meta,body){
        const data=body.toString();
        finalData=JSON.parse(data)
        console.log(finalData)
        res.redirect('/zoom_link/'+finalData.access_token);
    })
    
})
app.get('/getRedirection',(req,res,next)=>{
    res.redirect('/jwt')
})
app.get('/jwt',(req,res,next)=>{
    KEY =process.env.JWT_KEY
    SECRET = process.env.JWT_SECRET
    var date = new Date();
    date.setTime(date.getTime() + (60 * 1000));
    header = {
        "alg": "HS256",
        "typ": "JWT"
    }

    const payload = {
        iss: KEY,
        exp: ((new Date()).getTime() + 5000)
    };
    const token = jwt.sign(payload, SECRET);

 
      var request = require("request");

      var options = {
        method: 'POST',
        url: 'https://api.zoom.us/v2/users/me/meetings',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}` 
        },
        body: 
            {
                topic: "Hospital Appointment",
                type: 2,
                start_time: "2020-04-05T20:59:17",
                duration: 2,
                timezone: "2020-04-05T20:59:17",
                password: "123456",
                agenda: "HELP",
                recurrence: {
                  type: 1,
                  repeat_interval: 2,
                  weekly_days: "MOnday",
                  monthly_day: 23,
                  monthly_week: 3,
                  monthly_week_day: 10,
                  end_times: 5,
                  end_date_time: "2020-04-05T20:59:17"
                },
                settings: {
                  host_video: false,
                  participant_video: true,
                  cn_meeting: true,
                  in_meeting: true,
                  join_before_host: true,
                  mute_upon_entry: true,
                  watermark: true,
                  use_pmi: true,
                  approval_type: 0,
                  registration_type: 0,
                waiting_room:false,
                  meeting_authentication:false,
                  audio: "",
                  auto_recording: "",
                  enforce_login: true,
                  enforce_login_domains: "",
                  alternative_hosts: "",
                  global_dial_in_countries: [
                    ""
                  ],
                  registrants_email_notification: true
                }
              
        //   topic: 'demo',
        //   type: 2,
        //   start_time: '',
        //   duration: 6,
        //   timezone: ' ',
        //   password: 'heyman',
        //   agenda: 'hithere',
        //   settings: {
        //       host_video: false,
        //       participant_video: false,
            
        //       in_meeting: true,
        //       join_before_host: true,
        //       // "mute_upon_entry": "boolean",
        //       // "watermark": "boolean",
        //       use_pmi: false,
        //       approval_type: 0,
        //       registration_type: 2,
        //       // "audio": "string",
        //       // "auto_recording": "string",
        //       enforce_login: false,
        //       enforce_login_domains: "contactprescribe@gmail.com Prescribe@123",
        //       meeting_authentication:false,
              
        //       registrants_email_notification: false
        //     }
          },
        json: true
          };
            var finalData;
              request(options, function (error, response, body) {
              if (error) throw new Error(error);
              var finalData=body;
              console.log(body);
              res.send(body)
              });
    })
app.get('/zoom_link/:token',(req,res,next)=>{
   
    var request = require("request");

var options = {
  method: 'POST',
  url: 'https://api.zoom.us/v2/users/me/meetings',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${req.params.token}` 
  },
  body: {
    topic: 'demo',
    type: 2,
    start_time: '',
    duration: 6,
    timezone: ' ',
    password: 'heyman',
    agenda: 'hithere',
    settings: {
        host_video: false,
        participant_video: false,
      
        in_meeting: true,
        join_before_host: true,
        // "mute_upon_entry": "boolean",
        // "watermark": "boolean",
        use_pmi: false,
        approval_type: 0,
        registration_type: 2,
        // "audio": "string",
        // "auto_recording": "string",
        enforce_login: false,
        enforce_login_domains: "contactprescribe@gmail.com Prescribe@123",
        meeting_authentication:false,
        
        registrants_email_notification: false
      }
    },
  json: true
    };
      var finalData;
        request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var finalData=body;
        console.log(body);
        res.send(body)
        });
})

app.get('/payment_status',(req,res,next)=>{
  console.log(data)
    res.send(data)
})
app.get('/payment/:id1',(req,res)=>{
    console.log("test")
    const data=req.params.id1.split(',')
    console.log(data)
    var options = {
        amount: Number(data[6])*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcptid_17",
        payment_capture: '0'
        
      };
      instance.orders.create(options, function(err, order) {
          console.log(order)
         res.render("respose.ejs",{id:order.id,data:data,key:key_id})
         res.end()
      });
})
app.post('/callback',(req,res,next)=>{
    console.log("after callback")
    console.log("test")
    console.log(req.body)
    const {payment_id,order_id,signature}=req.body
    const hmac = crypto.createHmac('sha256', key_secret);

hmac.update(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id);
let generatedSignature = hmac.digest('hex');
console.log(generatedSignature)
if(generatedSignature==req.body.razorpay_signature)
{
    request('https://'+key_id+':'+key_secret+'@api.razorpay.com/v1/payments/'+req.body.razorpay_payment_id, function (error, response, body) 
    {
        console.log('payment Body');
    console.log(body)
  data=body;
    });
  }
  else
  {
    data.status="failed"
  }
  res.redirect("https://finalpre.herokuapp.com/PaymentConfirmation")
})
app.post('/patientDetail',(req,res,next)=>{
    console.log(req.body )
    const user_id=database.ref('/patients_data').push().key
    const HospitalName="NIZAR";
    database.ref('/patients_data/NIZAR').child(user_id).set({
        pid:user_id,
        age:req.body.age,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        sex:req.body.sex,
        address:req.body.address,
        DoctorId:req.body.docId,
        HospitalName:HospitalName,
        docName:req.body.docName,
        Slot:req.body.Slot
    })
    
    res.send({status:true,PatientId:user_id,HosName:HospitalName})
})
app.get('/final/:name',(req,res,next)=>{
    database.ref('/patients_data/NIZAR/'+req.params.name).once('value',snap=>{
       res.send(snap.val())
    })
})
app.post('/GetDets/:pid/:child',(req,res,next)=>{
  
    database.ref(`/patients_data/NIZAR/${req.params.pid}`).once('value',snap=>{
        var today = new Date();
        if(today.getMonth()+1<=9)
        var Month='0'+(today.getMonth()+1);
        else
        var Month=(today.getMonth()+1)
     
        if(today.getDate()<=9)
        var todayDate='0'+(today.getDate()+1);
        else
        var todayDate=today.getDate();
    
        var date =todayDate+'-'+Month+'-'+today.getFullYear();
    
        console.log(date)

        const DocId=snap.val().DoctorId;
        const PatDets=snap.val()
        const FinalUrl=req.body.link;
        var childno;
        
        database.ref(`/appointment/${date}/${DocId}`).once('value',snap=>{
             childno=snap.numChildren();
        
                 
            database.ref(`/appointment/${date}/${DocId}`).child(req.params.pid).set({
                adminBooked:true,
                Zoom_Link:req.body.link,
                pid:req.params.pid,
                queue:childno,
                age:PatDets.age,
                name:PatDets.name,
                email:PatDets.email,
                phone:PatDets.phone,
                sex:PatDets.sex,
                address:PatDets.address,
                DoctorId:PatDets.DoctorId,
                HospitalName:PatDets.HospitalName,
                docName:PatDets.docName,
                Slot:PatDets.Slot
            })
            console.log('patientdetails')
             res.send({object:PatDets,link:FinalUrl,childno:childno})
        }) 
       
        

   
   
})
})
app.get('/getData',(req,res,next)=>{
    
    var doc=new Array();
    var children
    var presentTokens=new Array();
    var today = new Date();
    
    if(today.getMonth()+1<=9)
    var Month='0'+(today.getMonth()+1);
    else
    var Month=(today.getMonth()+1)
 
    if(today.getDate()<=9)
    var todayDate='0'+(today.getDate()+1);
    else
    var todayDate=today.getDate();

    var date =todayDate+'-'+Month+'-'+today.getFullYear();
    console.log(date)
    const usersRef=database.ref(`schedule/${date}`);
    usersRef.once('value')
    .then(function(snapshot){
           snapshot.forEach(function(childSnapshot){
                    doc.push(childSnapshot.val())                        
            })
            database.ref(`appointment/${date}`).once('value')
            .then(function(snapshot){
                            snapshot.forEach(function(childSnapshot){
                                    for(i=0;i<doc.length;i++)
                                    {
                                        if(doc[i].doctorId==childSnapshot.key)
                                           {   console.log('matched')
                                               if(doc[i].maxtoken <= childSnapshot.numChildren())
                                                            doc[i].slot="unavailable"
                                           }
                                    }
                    })
                    console.log(doc)
                    res.send(doc);
                })
                .catch(err=>{
                    console.log(err)
                    })
           
        }).catch(err=>{
        console.log(err)
    })
})
  


app.post('/newUser',(req,res,next)=>{
    const user_id=usersRef.push().key;
    const email=req.body.email;
    const username=req.body.username;
    usersRef.orderByChild('email').equalTo(email).once('value').then((snapshot)=>{
        if(snapshot.val()!=null)
        {
            res.json({error:"This Email ID Exist Already"})
            console.log(snapshot.val())
        }
         //if Email Exist Already
        else 
        {
            usersRef.orderByChild('username').equalTo(username).once('value').then((snapshot)=>{
                if(snapshot.val()!=null)
                res.json({error:"Username Already Registered Try Different"}) // f username Exist Already
                else
                {
                usersRef.child(user_id).set({
                    username:req.body.username,
                    bloodGroup:req.body.bloodGroup,
                    age:req.body.age,
                    dateOfBirth:req.body.dateOfBirth,
                    email:req.body.email,
                    password:req.body.password
                })
                res.send({status:true})
               }
            })
        }
    })
})
app.get("/",(req,res)=>{
    response.send("test")
})
app.post('/Login',(req,res,next)=>{
    const checkData={
    email:req.body.email,
    password:req.body.password
    }
    usersRef.orderByChild('email').equalTo(checkData.email).once('value')
    .then((snapshot)=>{
            
        if(!snapshot.val()) {
           
                res.json({error:"User Not Registered",session:false})      
        }   
        else{
            snapshot.forEach(function(childSnapshot){
                var PrimaryKey=childSnapshot.key;
                if(childSnapshot.val().password==checkData.password)
                {
                   
                    const LoggedUser=childSnapshot.key;
                    res.json({LoggedUser,session:true,sessionID:PrimaryKey})
                }
                else
                {
                    res.json({error:'Wrong Password',session:false})
                }
            })
        }
        
    }).catch(err=>{
        console.log(err);
})
})
app.get('/:id',(req,res,next)=>{
    database.ref('users/'+req.params.id).once('value')
    .then((snapshot)=>{
    res.send(snapshot.val())
    })
    
})
app.post('/Logout',(req,res,next)=>{
//    req.session.ID=null;
   res.json({
       destroyed:true
   })
})

app.listen(port,()=>{
    console.log(`Runninnnn on ${port}`)
})
process.on('uncaughtException', function (err) {
    console.log(err);
}); 


// http.createServer(function (req, res) {

// 	switch(req.url){
// 		case "/process":
// 			var params 						= {};
// 			params['MID'] 					= PaytmConfig.mid;
// 			params['WEBSITE']				= PaytmConfig.website;
// 			params['CHANNEL_ID']		= 'WEB';
// 			params['INDUSTRY_TYPE_ID']	= 'Retail';
// 			params['ORDER_ID']			= 'TEST_'  + new Date().getTime();
// 			params['CUST_ID'] 			= 'Customer001';
// 			params['TXN_AMOUNT']			= '1.0';
// 			params['CALLBACK_URL']		= 'http://localhost:'+port+'/';
// 			params['EMAIL']				= 'abc@mailinator.com';
// 			params['MOBILE_NO']			= '123456';

// 			checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

// 				var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
// 				// var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
				
// 				var form_fields = "";
// 				for(var x in params){
// 					form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
// 				}
// 				form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

// 				res.writeHead(200, {'Content-Type': 'text/html'});
// 				res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit();</script></body></html>');
//                 res.end();
// 			});
// 		break;
	
// 		case "/callback":

// 			var body = '';
	        
// 	        req.on('data', function (data) {
// 	            body += data;
// 	        });

// 	        req.on('end', function () {
// 				var html = "";
// 				var post_data = qs.parse(body);


// 				// received params in callback
// 				console.log('Callback Response: ', post_data, "\n");
// 				html += "<b>Callback Response</b><br>";
// 				for(var x in post_data){
// 					html += x + " => " + post_data[x] + "<br/>";
// 				}
// 				html += "<br/><br/>";


// 				// verify the checksum
// 				var checksumhash = post_data.CHECKSUMHASH;
// 				// delete post_data.CHECKSUMHASH;
// 				var result = checksum_lib.verifychecksum(post_data, PaytmConfig.key, checksumhash);
// 				console.log("Checksum Result => ", result, "\n");
// 				html += "<b>Checksum Result</b> => " + (result? "True" : "False");
// 				html += "<br/><br/>";



// 				// Send Server-to-Server request to verify Order Status
// 				var params = {"MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID};

// 				checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

// 					params.CHECKSUMHASH = checksum;
// 					post_data = 'JsonData='+JSON.stringify(params);

// 					var options = {
// 						hostname: 'securegw-stage.paytm.in', // for staging
// 						// hostname: 'securegw.paytm.in', // for production
// 						port: 8080,
// 						path: '/merchant-status/getTxnStatus',
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/x-www-form-urlencoded',
// 							'Content-Length': post_data.length
// 						}
// 					};


// 					// Set up the request
// 					var response = "";
// 					var post_req = https.request(options, function(post_res) {
// 						post_res.on('data', function (chunk) {
// 							response += chunk;
// 						});

// 						post_res.on('end', function(){
// 							console.log('S2S Response: ', response, "\n");

// 							var _result = JSON.parse(response);
// 							html += "<b>Status Check Response</b><br>";
// 							for(var x in _result){
// 								html += x + " => " + _result[x] + "<br/>";
// 							}

// 							res.writeHead(200, {'Content-Type': 'text/html'});
// 							res.write(html);
// 							res.end();
// 						});
// 					});

// 					// post the data
//                     post_req.write(post_data);
//                     console.log(post_data)
// 					post_req.end();
// 				});
// 	        });
			
// 		break;
// 	}
	

// }).listen(port2);
