;(function($, undefined) {
  $.fn.calenderPicker = function(eve) {

  var $this = this;
  console.log($this.attr('id'));
  /* 
  var starTimeZero =new Date($('.calender_picker').attr('start-date'));
  var endTimeZero =new Date($('.calender_picker').attr('end-date'));
  var sPlot = $('.calender_picker').attr("data-plot");
   */
  
  var $starTimeZero =new Date($this.attr('start-date'));
  var $endTimeZero =new Date($this.attr('end-date'));
  var $sPlot = $this.attr("data-plot");
  var $result_selected = [];

  if (typeof $this.data('plot') !== 'undefined') {
    $result_selected=eval($sPlot);
  }

//    var $currentDate = new Date();    
    var $currentDate = $starTimeZero;    

    function generateCalendar(d) {
      function $monthDays(month, year) {
        var $result = [];
        var $days = new Date(year, month, 0).getDate();
        for (var $i = 1; $i <= days; $i++) {
          $result.push(i);
        }
        return $result;
      }
      Date.prototype.monthDays = function() {
        var $k = new Date(this.getFullYear(), this.getMonth() + 1, 0);
        return $k.getDate();
      };
      var $details = {
        totalDays: d.monthDays(),
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      };

      var $start = new Date(d.getFullYear(), d.getMonth()).getDay();

      var $cal = [];
      var $day = 1;
      for (var $i = 0; $i <= 6; $i++) {
        $cal.push(['<tr>']);
        for (var $j = 0; $j < 7; $j++) {
          if ($i === 0) {
            $cal[$i].push('<td class="dNam">' +$details.weekDays[$j] + '</td>');
          } else if ($day > $details.totalDays) {
            $cal[$i].push('<td>&nbsp;</td>');
          } else {
            if ($i === 1 && $j < $start) {
              $cal[$i].push('<td  attr="'+$start+'">&nbsp;</td>');
            } else {
                var $cDat=$day++;
                var $cMnt=d.getMonth()+1;
                var $nwDate =new Date($cMnt+'-'+$cDat+'-'+d.getFullYear());
                var $ifFnd=""

                if($nwDate <= $starTimeZero){
                  $ifFnd="fstDay";
                }else if($nwDate >= $endTimeZero){          
                  $ifFnd="lstDay";
                }else{
                  $ifFnd="";
                }
                
                if($cDat == 1){                  
                  $ifFnd="fstDay";
                }else if($cDat == $details.totalDays){
                  $ifFnd="lstDay";
                }
                

              if ($nwDate>=$starTimeZero && $nwDate<=$endTimeZero){
                  var $cData = $cMnt+'-'+$cDat+'-'+d.getFullYear();
                  $cal[$i].push('<td class="day  daySelect '+$ifFnd+' '+idChecked($cData)+'" c-data="'+$cData+'">' + $cDat + '</td>');
                }else{
                  $cal[$i].push('<td class="day">' + $cDat + '</td>');
                }
              
            }
          }
        }
        $cal[$i].push('</tr>');
      }
      $cal = $cal.reduce(function(a, b) {
        return a.concat(b);
      }, []).join('');
      
      $('#'+($this.attr('id'))+' .calender_picker').attr(($this.attr('id')),"a");
      $('#'+($this.attr('id'))+' .calender_picker').append($cal);
      $('#'+($this.attr('id'))+' .calender_month').text($details.months[d.getMonth()]);
      $('#'+($this.attr('id'))+' .calender_year').text(d.getFullYear());
      $('td.day').mouseover(function() {
        $(this).addClass('hover');
      }).mouseout(function() {
        $(this).removeClass('hover');
      });
    }

    $(document).on("click",'#'+($this.attr('id'))+' .left_calender', function (event) {
      $('#'+($this.attr('id'))+' .calender_picker').text('');
      if ($currentDate.getMonth() === 0) {
        $currentDate = new Date(currentDate.getFullYear() - 1, 11);        
        generateCalendar($currentDate);
      } else {
        $currentDate = new Date($currentDate.getFullYear(),$currentDate.getMonth() - 1); 
        generateCalendar($currentDate);
      }
    });


    $(document).on("click",'#'+($this.attr('id'))+' .right_calender', function (event) {
      $('#'+($this.attr('id'))+' .calender_picker').html('<tr></tr>');
      if ($currentDate.getMonth() === 11) {
        $currentDate = new Date($currentDate.getFullYear() + 1, 0);  
        generateCalendar($currentDate);
      } else {
        $currentDate = new Date($currentDate.getFullYear(), $currentDate.getMonth() + 1); 
        generateCalendar($currentDate);
      }
    });        
    generateCalendar($currentDate);

    function idChecked(data){
      const index = $result_selected.indexOf(data);
      if (index > -1) {
        return "active";
      }else{
        return "";
      }
    }


    
    $(document).on("click",'#'+($this.attr('id'))+' .daySelect', function (event) {
      $(this).toggleClass('active');
      const index = $result_selected.indexOf($(this).attr('c-data'));
      if (index > -1) {
        $result_selected.splice(index, 1);
      }else{
        $result_selected.push($(this).attr('c-data'));
      }
      console.log($result_selected);
      eve($result_selected);
  });

};
})(jQuery);
