    $(function(){
    
		       (function(){
			      var x,y,endX,endY;

			      var history = new Array();
		    	  var cStep = -1;

			      var lineTip = $("#container").appendLine({width:"1px",type:"solid",color:"red",beginX:0,beginY:0,endX:1,endY:1});
			      var dottedlineTip = $("#container").appendLine({width:"1px",type:"dashed",color:"blue",beginX:0,beginY:0,endX:1,endY:1});
			      var rectTip = $(" <div style='border:1px solid gray; width:1px;height:1px;position:absolute;display:none;'></div>");
			      var fontTip =$("<textarea rows='3' cols='20' style='background:transparent;position:absolute;display:none;'></textarea>"); 
			      $("#container").append(rectTip);
			      $("#container").append(fontTip);

			      var flag = false;
			      var ctx=document.getElementById("myCanvas").getContext("2d");

			      var command = 1;
			      var commandCallbacks = $.Callbacks();
			      commandCallbacks.add(switchCanvasContext);
			      commandCallbacks.add(switchCursorStyle);

			      $("#tools_pencil").trigger("click");
			      commandCallbacks.fire(command);
			      
			      initUI();

				  // 通过command值进行工具切换
			      $("[name='toolsOption']").change(function(){
			    	  var val = $(this).val();
			    	  var type = $(this).attr("id");
			    	  if("on" == val)
			    	  {    
			    		  switch(type)
			    		  {
				    		  case "tools_pencil"		:{command=1;break;}
				    		  case "tools_eraser"		:{command=2;break;}
				    		  case "tools_trash"		:{command=3;break;}
				    		  case "tools_line"			:{command=4;break;}
				    		  case "tools_dottedline"	:{command=5;break;}
				    		  case "tools_rectangle"	:{command=6;break;}
				    		  case "tools_circle"		:{command=7;break;}
				    		  default 					:{command=1;};
			    		  }
			    		  commandCallbacks.fire(command);
			    	  }	
			      });
			      
			      $("#container").mousemove(mouseMoveEventHandler);

			      function mouseMoveEventHandler(e)
			      {
			          switch(command)
			          {
			          	case 1	:	{	drawPencil(e);break; }
			          	case 2	:	{	drawPencil(e);break; }
			          	case 4	:	{   fakeLineInput(e);break;	   }
			          	case 5  :   {   fakeDottedLineInput(e);	break; }
			          	case 6	:	{   fakeRectangleInput(e);break;    }
			          	case 7	:	{   fakeWordsInput(e);break;    }
			          }
			      }

				  // 输入指示框
			      function fakeWordsInput(e)
			      {
			    	  var offset = $("#myCanvas").offset();
			          endX = e.pageX-offset.left;
			          endY = e.pageY-offset.top;
			          if(flag)
			            {
			               fontTip.show();
			               fontTip.css({left:x,top:y});
			               fontTip.width(endX-x);
			               fontTip.height(endY-y);
			            }
			      }

				  // 指示矩形
			      function fakeRectangleInput(e)
			      {
			      	    var offset = $("#myCanvas").offset();
			            endX = e.pageX-offset.left;
			            endY = e.pageY-offset.top;
			            var borderWidth  = $("#penWidth").val(); 
			            if(flag)
			            {
			               rectTip.css({left:x,top:y});
			               rectTip.width(endX-x-borderWidth*2);
			               rectTip.height(endY-y-borderWidth*2);
			               console.log(flag);
			            }
			      }

			      // 指示线
			      function fakeLineInput(e)
			      {
			      	    var offset = $("#myCanvas").offset();
			            endX = e.pageX-offset.left;
			            endY = e.pageY-offset.top;
                        ctx.setLineDash([]);
			     		if(flag)
					    {
						   lineTip.adjustLine({
							   beginX:x,
							   beginY:y,
							   endX:endX,
							   endY:endY,
							   parent:$("#myCanvas")
						   })
				        }
			      }

			      function fakeDottedLineInput(e)
			      {
			    	  var offset = $("#myCanvas").offset();
			            endX = e.pageX-offset.left;
			            endY = e.pageY-offset.top;
			     		if(flag) {
                            dottedlineTip.adjustLine({
                                beginX: x,
                                beginY: y,
                                endX: endX,
                                endY: endY,
                                parent: $("#myCanvas")
                            })
                            ctx.setLineDash([10, 15]);
                        }
			      }
			      
			      // 画笔
			      function drawPencil(e){
			            if(flag)
			            {
			            	 var offset = $("#myCanvas").offset();
			            	 var x = e.pageX-offset.left;
			            	 var y = e.pageY-offset.top;
					      	 $("#show").html(x + ", " + y+"  "+e.which);
							 ctx.lineTo(x,y);
							 ctx.stroke();  
			            }
						else
						{
							ctx.beginPath();
						    var offset = $("#myCanvas").offset();
			            	var x = e.pageX-offset.left;
			            	var y = e.pageY-offset.top;
						    ctx.moveTo(x,y);
						}
			      }

			      // 清除画板
			      function clearCanvas()
			      {
			      		ctx.fillStyle="#FFFFFF";
						var width  = $("#myCanvas").attr("width");
						var height  = $("#myCanvas").attr("height");
						ctx.fillRect(0,0,width,height);	
			      }
			      
			      // 鼠标事件
			      $("#container").mousedown(function(e){

			             flag = true;
			             var offset = $("#myCanvas").offset();
			             x = e.pageX-offset.left;
						 y = e.pageY-offset.top;
						 console.log("begin:"+x+" "+y);
						 
						 switch(command)
						 {
						 	case 1	:	{	break; }
				          	case 2	:	{	break; }
				          	case 4	:	{   lineTip.show(); break; }
				          	case 5	:	{   dottedlineTip.show();break; }
				          	case 6	:	{
				      					   var borderColor = "#"+ $("#colorpicker-popup").val();
				      					   var borderWidth  = $("#penWidth").val()+"px"; 
				      					   var sr = borderColor +" "+borderWidth+ " solid";
				      					   var backgroundColor ="#"+$("#colorpicker-popup2").val();
				      					   rectTip.css({
				      						   "border": sr,
				      						   "background-color":backgroundColor
				      					   });
				          					rectTip.show();
				          					break;    
				          				}
				          	case 7	:	{   break;    }
						 }
			      });

				  // 鼠标事件
			      $("#container").mouseup(function(e){
			      
			            flag=false;

			            historyPush();	
    					
						switch(command)
						{
						 	case 1	:	{	break; }
				          	case 2	:	{	break; }
				          	case 4	:  	{   drawline();break;}
				          	case 5	:  	{   drawDashed();break;}
				          	case 6	:	{   drawRectangle();break;}
				          	case 7	:	{   fontTip.focus();break;}
						}
			      });
			      
			      fontTip.blur(drawWords);
			      $("#tools_undo").click(undo);
			      $("#tools_redo").click(redo);

				  // 直线
			      function drawline(){
                         ctx.setLineDash([]);
		          		 ctx.beginPath();
					     var offset = $("#myCanvas").offset();
					     ctx.moveTo(x,y);
					     ctx.lineTo(endX,endY);
					     ctx.stroke();
					     lineTip.hide();
			      }

				  // 虚线
			      function drawDashed(){
                        ctx.beginPath();
                        var offset = $("#myCanvas").offset();
					　　ctx.setLineDash([10, 15]);
					　　ctx.moveTo(x,y);
                        ctx.lineTo(endX,endY);
                        dottedlineTip.hide();
                        ctx.stroke();
					}

				  // 矩形
			      function drawRectangle(){
	   		 			 var borderWidth  = $("#penWidth").val();
	  					 ctx.fillRect(x,y,endX-x,endY-y);
					     ctx.strokeRect(x,y,endX-x,endY-y);
					 	 $("#myCanvas").focus();
					     rectTip.hide();
			      }

				  // 文字
			      function drawWords(e){
			    	  var words = fontTip.val().trim();
      					if(	fontTip.css("display")!= "none" && words )
      					{
      						ctx.strokeStyle ="#"+ $("#colorpicker-popup").val();
      						ctx.fillStyle ="#"+$("#colorpicker-popup2").val();
            			    var offset = $("#myCanvas").offset();
            			    var offset2 = fontTip.offset();
            			    var fontSize = $("#fontSize").val();
            			    fontSize =fontSize.substring(0,fontSize.length-2);
            			    ctx.fillText(words,offset2.left-offset.left,(offset2.top-offset.top+fontSize*1));
            			    
      			    	  	fontTip.val(""); 
      					}
      					fontTip.hide();
			      }
			      
				  // 撤销
		    	  function undo()
		    	  {
		    		  if (cStep >= 0) 
		    		  {
		    			  clearCanvas();
		    			  cStep--;
		    			  var tempImage = new Image();
		    			  tempImage.src = history[cStep];
		    			  tempImage.onload = function () { ctx.drawImage(tempImage, 0, 0);};
		    		  }
		    		  
		    	  }

				  // 重做
				  function redo()
				  {
		    		  if (cStep <history.length-1) 
		    		  {
		    			  clearCanvas();
		    			  cStep++;
		    			  var tempImage = new Image();
		    			  tempImage.src = history[cStep];
		    			  tempImage.onload = function () { ctx.drawImage(tempImage, 0, 0); };
		    		  }
				  }

				  // 初始化窗口
				  function initUI()
			      {
					  // canvas 被拖动，重新设置画板大小（因为拖动是css效果，而实际画板大小是width和height属性）
				      $("#myCanvas").resizable({
					      stop:function(event,ui){
					            var height =  $("#myCanvas").height();
					            var width =$("#myCanvas").width();
					            $("#myCanvas").attr("width",width);
					            $("#myCanvas").attr("height",height);
					            // 画板大小改变，画笔也会被初始化，这里将画笔复原
					            switchCanvasContext();
					      },
				      	grid: [ 20, 10 ]
				      });
				      
				      // 画笔粗细设置
				      $("#penWidth").selectmenu({
				          width:100,
						  select:penWidthEventListener
				      });

				      function penWidthEventListener(event,ui){
				    	  // 1. 更新画笔粗细
				    	  var lineWidth = ui.item.value;
			              ctx.lineWidth =lineWidth;
			              
			              // 2. 更新线条粗细
			              lineTip.css("border-top-width",lineWidth+"px");
			              dottedlineTip.css("border-top-width",lineWidth+"px");
			              
			              // 3. 更新边框粗细
			              rectTip.css("border-width",lineWidth+"px");
			              return false;
				      }

				      $("#fontSize").selectmenu({
				    	  width:100,
				    	  select:function(event,ui){
				    		  setFont();
				    	  }
				      });

				      $("#fontType").selectmenu({
				    	  width:100,
				    	  select:function(event,ui){
				    		  setFont();
				    		  return false;
				    	  }
				      });
					
				      setFont();
				      
					  // 调用颜色选择器，边框（线条）颜色
					  $("#colorpicker-popup").colorpicker({
					     buttonColorize: true,
					     alpha:          false,
					     draggable:      true,
				         showOn:         'both',
					   	close:borderColorEventListener
					  });
					  
					  function borderColorEventListener(e)
					  {
						  var color= "#"+$(this).val();
					   	  ctx.strokeStyle =color;

					   	  lineTip.css({"border-color":color});
					   	  dottedlineTip.css({"border-color":color});
					   	  rectTip.css({"border-color":color});
					  }


					  // 用颜色选择器，填充（文字）颜色
					  $("#colorpicker-popup2").colorpicker({
					     buttonColorize: true,
					     alpha:          false,
					     draggable:      true,
				         showOn:         'both',
				         close:fillColorEventListener
					  });
					  
					  function fillColorEventListener(e)
					  {
						  	var color= "#"+$(this).val();
					   	   	ctx.fillStyle = color;
					   	   	rectTip.css({"background-color":color});
					   	   	fontTip.css({"color":color});
					  }
					  
			      }
				  
				  $("#italicOption").click(setFont);
				  $("#boldOption").click(setFont);
				  
				  // 设置字体
			      function setFont(){
			    	  var size = $("#fontSize").val();
			    	  var type = $("#fontType").val();
			    	  var color = "#" +$("#colorpicker-popup2").val();

					  // 加粗
			    	  var fontWeight = $("#boldOption").get(0).checked;
			    	  fontWeight = fontWeight ? "bold" : " ";
					  // 斜体
			    	  var fontItalic =$("#italicOption").get(0).checked;
			    	  fontItalic = fontItalic ? " italic " : " ";
			    	  ctx.font = fontItalic+ fontWeight+" " +size+" "+type;
			    	  fontTip.css({"font-size":size,"font-family":type,color:color,"font-style":fontItalic,"font-weight":fontWeight});
			      }

				 // 保存图片
				 $("#tools_save").click(saveItAsImage);
				   function saveItAsImage()
				  {
					  var type = 'png';
					  var imgData = $("#myCanvas").get(0).toDataURL(type);

					  var _fixType = function(type) {
						  type = type.toLowerCase().replace(/jpg/i, 'jpeg');
						  var r = type.match(/png|jpeg|bmp|gif/)[0];
						  return 'image/' + r;
					  };
					  imgData = imgData.replace(_fixType(type),'image/octet-stream');
					  var saveFile = function(data, filename){
						  var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
						  save_link.href = data;
						  save_link.download = filename;

						  var event = document.createEvent('MouseEvents');
						  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						  save_link.dispatchEvent(event);
					  };
					  var filename = '画板.' + type;
					  saveFile(imgData,filename);
				  }

				  // 保存历史操作
			      function historyPush()
			      {
			          cStep++;
    				  if (cStep < history.length) 
    				  { 
    						history.length = cStep; 
    				  }
    				  history.push($("#myCanvas").get(0).toDataURL());
			      }

			      function switchCanvasContext(command)
			      {
			          ctx.lineWidth = $("#penWidth").val();
				   	  ctx.strokeStyle ="#"+ $("#colorpicker-popup").val();
				   	  ctx.lineCap = "round";
				   	  ctx.fillStyle ="#"+$("#colorpicker-popup2").val();
				   	  
			          if(command)
			          {
				          switch(command){
				             case 1: {
						          break;
				             }
				             case 2: {
				                  ctx.strokeStyle ="#FFFFFF";
						          break;
				             }
				             case 3:{
				            	 clearCanvas();
				            	 $("#tools_pencil").trigger("click");
						         $("#tools_pencil").focus();
				             }
				         }
			          }
				   	  return ctx;
			      }

			      function switchCursorStyle(command) {
                      Label:if (command === 1) {
                          {
                              $("#myCanvas").removeClass("container_eraser");
                              $("#myCanvas").removeClass("container_font");
                              $("#myCanvas").addClass("container_pencil");

                          }
                      } else if (command === 2) {
                          {
                              $("#myCanvas").removeClass("container_pencil");
                              $("#myCanvas").removeClass("container_font");
                              $("#myCanvas").addClass("container_eraser");

                          }
                      } else if (command === 6) {
                          {
                              $("#myCanvas").removeClass("container_eraser");
                              $("#myCanvas").removeClass("container_pencil");
                              $("#myCanvas").addClass("container_font");

                          }
                      } else {
                          {
                              $("#myCanvas").removeClass("container_eraser");
                              $("#myCanvas").removeClass("container_font");
                              $("#myCanvas").addClass("container_pencil");

                          }
                      }
                  }
       })();
    });
