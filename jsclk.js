var alarminterval=0,stpwinterval=0,timeinterval=0,uv=0,change=0,change1=0,t_hr=0,t_mn=0,t_sc=0,st_mn=00,st_sc=00,st_msc=00,flag=0;
function set(x)
{   switch(x)
    {   
        case 1: document.getElementById('alarmclock').style.display='block';
                document.getElementById('clk').style.display='none'; x=1;
                break;

        case 2: if(timeinterval==0)
                { timeinterval = setInterval(time,1000); }
                document.getElementById('clk').style.display='block';    
                document.getElementById('alarmclock').style.display='none'; x=1;
                break;

        case 3: document.getElementById('stopwatch').style.display='block';  
                if(stpwinterval==0)
                { document.getElementById('sth').innerHTML = "00:00.00"; }
                document.getElementById('timer').style.display='none'; x=2;
                break;

        case 4: document.getElementById('timer').style.display='block';
                if(uv==0)
                { document.getElementById('tth').style.display='none'; }
                document.getElementById('stopwatch').style.display='none'; x=2;
                break;
    }
    switch(x)
    {
        case 1: document.getElementById('stopwatch').style.display='none';
                document.getElementById('timer').style.display='none';
                break;
        case 2: document.getElementById('clk').style.display='none';
                document.getElementById('alarmclock').style.display='none';
                break;
    }
}

function time()
{
    var current = new Date();
    var hour = current.getHours();
    var min = current.getMinutes();
    var sec = current.getSeconds();
    var day = current.getDay();
    var date = current.getDate();
    var month = current.getMonth();
    
    switch(day)
    {
        case 0: day = "Sunday"; break;
        case 1: day = "Monday"; break;
        case 2: day = "Tuesday"; break;
        case 3: day = "Wednesday"; break;
        case 4: day = "Thrusday"; break;
        case 5: day = "Friday"; break;
        case 6: day = "Saturday"; break;
    }
    
    switch(month)
    {
        case 0: month = "January"; break;
        case 1: month = "February"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;							
    }

    document.getElementById('date').innerHTML = day + "," + date + " " + month;
    if(hour<10 && min<10 && sec<10){document.getElementById('time').innerHTML = "0"+hour + ":0" + min + ":0" + sec; }
    else if(hour<10 && min<10){document.getElementById('time').innerHTML = "0"+hour + ":0" + min + ":" + sec; }
    else if(hour<10 && sec<10){document.getElementById('time').innerHTML = "0"+hour + ":" + min + ":0" + sec; }
    else if(min<10 && sec<10){document.getElementById('time').innerHTML = hour + ":0" + min + ":0" + sec; }
    else if(hour<10){document.getElementById('time').innerHTML = "0"+hour + ":" + min + ":" + sec; }
    else if(min<10){document.getElementById('time').innerHTML = hour + ":0" + min + ":" + sec; }
    else if(sec<10){ document.getElementById('time').innerHTML = hour + ":" + min + ":0" + sec; }	
    else { document.getElementById('time').innerHTML = hour + ":" + min + ":" + sec;	}
}


function setalarm()
{
    var time = document.getElementById('alarmtime');    
    if(time.value.length<5)
    { alert("Set Alarm First"); return; }
    xhr = time.value[0] + time.value[1]; 
    xmin = time.value[3] + time.value[4];
    var current = new Date();
    var hour = current.getHours();  
    var min = current.getMinutes();
    
    if( ( (xhr<hour)&&(xmin<min) ) || ( (xhr==hour)&&(xmin<min) ) )
    { chr = 24-hour; chr = Number(xhr)+Number(chr)-1; }
    else if(xhr<hour){ chr=24-hour; chr=Number(xhr)+Number(chr); }
    else if((xhr>hour) && (xmin<min)){ chr=xhr-hour-1;  }
    else{ chr=xhr-hour; }
    
    if(xmin<min)
    { cmin=60-min; cmin=Number(xmin)+Number(cmin); }
    else
    { cmin=xmin-min; }
    
    alert("Alarm Ring in " +chr+ " hour " +cmin+ " minutes"); 
    
    alarminterval = setInterval(check,1000); 
}
function check()   
{
    var time = document.getElementById('alarmtime');
    var current = new Date();
    var hour = current.getHours();  
    var min = current.getMinutes();
    if(hour<10 && min<10)
    { var currenttime = "0"+hour+":0"+min; }
    else if(min<10)
    { var currenttime = hour+":0"+min; }
    else if(hour<10)
    { var currenttime = "0"+hour+":"+min; }
    else
    { var currenttime = hour+":"+min; }
    if(currenttime == time.value)
    {   
        alert("Alarm TIMEOUT"); 
        clearInterval(alarminterval); 
        document.getElementById('alarmtime').value="00:00";
        document.getElementById('alarmclock').style.display='none';    
    }    
}    

function strt(x)
{   
    switch(x)
    { case 1:   change++;
                if(change%2!=0)
                {   
                    document.getElementById('st_sp').innerHTML="Stop";
                    document.getElementById('st_sp').style.color="yellow";
                    stpwinterval=setInterval(stpwatch,17);
                }
                else
                {   
                    clearInterval(stpwinterval); 
                    document.getElementById('st_sp').innerHTML="Start";
                    document.getElementById('st_sp').style.color="white";
                }
                break;   

      case 2: clearInterval(stpwinterval);
              change=0; 
              document.getElementById('st_sp').innerHTML="Start";
              document.getElementById('st_sp').style.color="white";
              st_mn=00,st_sc=00,st_msc=00;
              document.getElementById('sth').innerHTML = "00:00.00";
              break;

      case 3: if(t_hr==0 && t_mn==0 && t_sc==0)
              {
                var time = document.getElementById('timerset');
                if(time.value.length<5 || time.value=="00:00:00")
                { alert("Set TIME First"); break; }
                document.getElementById('timerset').style.display="none";
                document.getElementById('tth').style.display="block";
                if(time.value.length==5){ t_sc=00; }
                else{ t_sc = time.value[6] + time.value[7]; }
                t_hr = time.value[0] + time.value[1]; 
                t_mn = time.value[3] + time.value[4]; 
                document.getElementById('tth').innerHTML = t_hr + ":" + t_mn + ":" + t_sc;
              }
              change1++;
              if(change1%2!=0)
              {   
                  document.getElementById('stsp').innerHTML="Stop";
                  document.getElementById('stsp').style.color="yellow";
                  uv=setInterval(tmrs,1000);
              }
              else
              {   
                 clearInterval(uv); 
                 document.getElementById('stsp').innerHTML="Start";
                 document.getElementById('stsp').style.color="white";
              }
              break;

      case 4: clearInterval(uv);
              change1=0;
              document.getElementById('stsp').innerHTML="Start";
              document.getElementById('stsp').style.color="white";
              t_hr=00,t_mn=00,t_sc=00;
              document.getElementById('timerset').style.display="block";
              document.getElementById('tth').style.display="none";
              document.getElementById('timerset').value = "00:00:00";        
              break;
    }   
}

function stpwatch()							
{	
    ++st_msc;
    document.getElementById('sth').innerHTML = st_mn + ":" + st_sc + "." + st_msc;
    if(st_msc==60)
    {	++st_sc; st_msc=00;		
            if(st_sc==60)
            { st_sc=00; ++st_mn; }
    }
}


function tmrs()
{
    if(t_hr==0 && t_mn==0 && t_sc==0)
    { document.getElementById('timerset').value = "00:00:00";
      document.getElementById('timerset').style.display = 'block';
      document.getElementById('tth').style.display="none";
      clearInterval(uv);
      document.getElementById('stsp').innerHTML="Start";
      document.getElementById('stsp').style.color="white";
      alert("TIMES_UP"); 
    }
    else
    {
      if(t_mn>0 && t_sc==0)
      {
          t_sc=59; --t_mn;
      }
      if(t_mn==0 && t_hr>0 && t_sc==0)
      {
          t_mn=59; --t_hr; t_sc=59;
      }
      document.getElementById('tth').innerHTML = t_hr + ":" + t_mn + ":" + t_sc;
      --t_sc;
    }
}