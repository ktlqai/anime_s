"use strict";

//Common and global system functions

if (!window.console) {
	window.console = {
		log: function(){},
		dir: function(){}
	}
}

var popup_get_cookie = function(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

var popup_set_cookie = function(name, value, options) {
	options = options || {};
	var expires = options.expires;
	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires*1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) { 
		options.expires = expires.toUTCString();
	}
	value = encodeURIComponent(value);
	var updatedCookie = name + "=" + value;
	for(var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];    
		if (propValue !== true) { 
		updatedCookie += "=" + propValue;
		}
	}
	document.cookie = updatedCookie;
}

var load_script = function(src, callback) {
	var s,
		r,
		t;
	r = false;
	s = document.createElement('script');
	s.type = 'text/javascript';
	s.src = src;
	s.onload = s.onreadystatechange = function() {
		//console.log( this.readyState ); //uncomment this line to see which ready states are called.
		if ( !r && (!this.readyState || this.readyState == 'complete') ) {
			r = true;
			callback();
		}
	};
	t = document.getElementsByTagName('script')[0];
	t.parentNode.insertBefore(s, t);
}

var getSelText = function() {
	var txt = '';
	if (window.getSelection) {
		txt = window.getSelection();
	} else if (document.getSelection) {
		txt = document.getSelection();
	} else if (document.selection) {
		txt = document.selection.createRange().text;
	} else return;

	return txt.toString();
};

var ajax_request2 = function(url, params, handler, type_r) {
	if (type_r == null) {
		type_r = "POST";
	}
	var form_data = new FormData();
	for (var key in params) {
		form_data.append(key, params[key]);
	}
	var request = new XMLHttpRequest();
	request.open(type_r, url);
	request.onreadystatechange = function() {
		handler(request);
	};
	request.send(form_data);
}

var ajax_request3 = function(url, form_data, handler, type_r) {
	if (type_r == null) {
		type_r = "POST";
	}
	var request = new XMLHttpRequest();
	request.open(type_r, url);
	request.onreadystatechange = function() {
		handler(request);
	};
	request.send(form_data);
}

// forEach method, could be shipped as part of an Object Literal/Module
var forEach = function (array, callback, scope) {
	for (var i = 0; i < array.length; i++) {
		callback.call(scope, array[i], i); // passes back stuff we need
	}
};

var get_by_id = function(id) {
	return document.getElementById(id);
}

var getClickPosition = function(e) {
    var parentPosition = getElementPosition(e.currentTarget);
    return {
    	x: e.clientX - parentPosition.x,
    	y: e.clientY - parentPosition.y
    };
}
 
var getElementPosition = function(element) {
    var xPosition = 0,
    	yPosition = 0,
    	scrollLeft = 0,
    	scrollTop = 0;
    
    while (element) {
    	if (element.tagName == "BODY") {
    		scrollLeft = document.documentElement.scrollLeft > element.scrollLeft ? document.documentElement.scrollLeft : element.scrollLeft;
    		scrollTop = document.documentElement.scrollTop > element.scrollTop ? document.documentElement.scrollTop : element.scrollTop;
    	} else {
    		scrollLeft = element.scrollLeft;
    		scrollTop = element.scrollTop;
    	}
        xPosition += (element.offsetLeft - scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

var queryString = function(obj) {
	var str = [];
	for(var p in obj) {
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	}
	return str.join("&");
}

var bbcode_tags = function(textarea_id) {
	forEach(document.querySelectorAll(".bbcode_tag"), function(elem){
		elem.addEventListener("click", function(event) {
			var chat_send_text = document.getElementById(textarea_id),
				string = "";

			event.preventDefault();
			event.stopPropagation();

			string = getSelText();
			if (string == "") {
				chat_send_text.focus();
				string = getSelText();
				if(typeof chat_send_text.selectionStart == 'number' &&
				   typeof chat_send_text.selectionEnd == 'number') {
					// All browsers except IE
					var selected_text = chat_send_text.value.slice(chat_send_text.selectionStart,
																   chat_send_text.selectionEnd);
					var before = chat_send_text.value.slice(0, chat_send_text.selectionStart);
					var after = chat_send_text.value.slice(chat_send_text.selectionEnd);

					chat_send_text.value = before + this.getAttribute("data-param-open")  + selected_text + this.getAttribute("data-param-close") + after;
				}
			} else {
				chat_send_text.value += this.getAttribute("data-param-open") + string + this.getAttribute("data-param-close");
			}
		});
	});
}

if (!String.prototype.startsWith) {
	Object.defineProperty(String.prototype, 'startsWith', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: function(searchString, position) {
			position = position || 0;
			return this.lastIndexOf(searchString, position) === position;
		}
	});
}

var hexToRgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var AnimePictures = {};

//AutoComplete
(function(){
	this.AutoComplete = function(input_tag, action_url, auto_append, logic_op) {
		var self = this;
		if (auto_append == null) {
			self.auto_append = true;
		} else {
			self.auto_append = auto_append;
		}
		if (logic_op == null) {
			self.logic_op = "||";
		} else {
			self.logic_op = logic_op;
		}
		this.input_tag = get_by_id(input_tag);
		if (this.input_tag == undefined || this.input_tag == null) {
			return;
		}
		if (this.input_tag.form) {
			this.input_tag.form.setAttribute('autocomplete','off');
		}
		if (this.input_tag.setAttribute != undefined) {
			this.input_tag.setAttribute('autocomplete','off');
		}
		
		this.action_url = action_url;
		this.focus_block = false;
		this.autocomplete_text = '';
		this.key_count = -1;
		this.focus_t = null;
		this.focus_t2 = null;
		this.reload_time = 200;
		this.skip_focus = false;

		var body = document.body,
			body_rect = body.getBoundingClientRect(),
			input_tag_rect = this.input_tag.getBoundingClientRect();


		this.tags_list = document.createElement("UL");
		this.tags_list.setAttribute("class", "autocomplite");
		this.make_tag_list_position();

		body.appendChild(this.tags_list);

		this.input_tag.addEventListener("focus", function(){
			self.make_tag_list_position();
			if (self.skip_focus) {
				self.skip_focus = false;
				clearTimeout(self.focus_t);
				self.focus_t = null;
				return;
			}
			self.focus_t = setInterval(function(){self.load();}, 1000);
		}, true);
		
		this.input_tag.addEventListener("blur", function(){
			if (!self.focus_t2) {
				clearTimeout(self.focus_t);
				self.focus_t2 = setInterval(function(){self.hidden();}, 500);
			}
		});

		document.addEventListener("click", function(event){
			if (self.tags_list != event.target) {
				self.hidden();
			}
		});

		this.input_tag.addEventListener("keydown", function(event){
			self.keyh(event);
		}, true);

		window.addEventListener("resize", function(event){
			self.make_tag_list_position();
		});

		return this;
	}

	this.AutoComplete.prototype.make_tag_list_position = function() {
		var body_rect = document.body.getBoundingClientRect(),
			input_tag_rect = this.input_tag.getBoundingClientRect();

		this.tags_list.style.width = this.input_tag.offsetWidth+"px";
		this.tags_list.style.left = (input_tag_rect.left - body_rect.left) + "px";
		this.tags_list.style.top = (input_tag_rect.top - body_rect.top + this.input_tag.offsetHeight) + "px";
	}

	this.AutoComplete.prototype.hidden = function() {
		this.tags_list.style.visibility = "hidden";
		clearTimeout(this.focus_t2);
	};

	this.AutoComplete.prototype.ajax_load = function(tag) {
		var self = this;
		var request = function(req) {
			if (req.readyState != 4) {
				return;
			}
			if (req.status != 200) {
				console.log("Network error");
				return;
			}
			var json_req = JSON.parse(req.responseText);
			var json_list = json_req["tags_list"];
			if (json_list == null) {
				self.hidden();
				return;
			}
			var li_tag, last_c1, last_c2, last_string, need_string;
			
			self.tags_list.innerHTML = '';
			for (var i = 0; i < json_list.length; i++) {
				li_tag = document.createElement("LI");
				li_tag.innerHTML = json_list[i]["t"];
				if (json_list[i]["t2"]) {
					li_tag.text = json_list[i]["t2"];
				} else {
					li_tag.text = json_list[i]["t"];
				}
				self.tags_list.appendChild(li_tag);
				switch(json_list[i].c) {
					case 1:
						li_tag.innerHTML = "{"+li_tag.innerHTML+"}";
						li_tag.style.color = "#006699";
						break;
					case 3:
					case 5:
					case 6:
						li_tag.style.color = "green";
						li_tag.style.fontWeight = "bold";
						break;
					case 4:
						li_tag.style.color = "darkorange";
						li_tag.style.fontWeight = "bold";
						li_tag.style.fontStyle = "italic";
						break;
				}
				li_tag.addEventListener("click", function(){
					self.skip_focus = true;
					self.set_text(this, true);
					self.input_tag.focus();
					//self.hidden();
				});
			}

			if (self.auto_append == true && json_list.length == 1) {
				last_c1 = self.input_tag.value.lastIndexOf('||');
				last_c2 = self.input_tag.value.lastIndexOf('&&');
				if (last_c2 > last_c1) {
					last_c1 = last_c2;
				}
				if (last_c1 > 0) {
					last_string = self.input_tag.value.substring(last_c1 + 2);
				} else {
					last_string = self.input_tag.value;
				}
				if (json_list[0]["t2"]) {
					need_string = json_list[0]["t2"];
				} else {
					need_string = json_list[0]["t"];
				}
				need_string = need_string.replace("<b>", "").replace("</b>", "");
				if (last_string == need_string) {
					self.input_tag.value = self.input_tag.value+"||";
				}
			}
		}
		
		if (tag != "" && tag.length > 0) {
			ajax_request2(
				this.action_url,
				{"tag": tag},
				request
			)
		}
	}

	this.AutoComplete.prototype.load = function() {
		if (this.focus_block) {
			return;
		}
		if (this.input_tag.value != this.autocomplete_text) {
			if (this.input_tag.value.length > 0) {
				var last_c1 = this.input_tag.value.lastIndexOf('||');
				var last_c2 = this.input_tag.value.lastIndexOf('&&');
				if (last_c2 > last_c1) {
					last_c1 = last_c2;
				}
				if (last_c1 > 0) {
					this.ajax_load(this.input_tag.value.substring(last_c1 + 2));
				} else {
					this.ajax_load(this.input_tag.value);
				}
				
				this.key_count = -1;
				this.tags_list.style.visibility = "visible";
			} else {
				this.tags_list.innerHTML = '';
			}
			this.autocomplete_text = this.input_tag.value;
		}
	}

	this.AutoComplete.prototype.set_text = function(li, last) {
		if (li == null)
			return;
		var last_c1 = this.input_tag.value.lastIndexOf('||');
		var last_c2 = this.input_tag.value.lastIndexOf('&&');
		if (last_c2 > last_c1)
			last_c1 = last_c2;
		if (last_c1 > 0) {
			this.input_tag.value = this.input_tag.value
				.substring(0,last_c1 + 2)
				+
				li.text.replace("<b>", "")
				.replace("</b>", "");
		} else {
			if (li) {
				this.input_tag.value = li.text.replace("<b>", "").replace("</b>", "");
			}
		}

		if (this.auto_append == true && last != null) {
			this.input_tag.value = this.input_tag.value+this.logic_op;
		}
		
	};

	this.AutoComplete.prototype.keyh = function(event) {
		var self = this;
		var keynum = event.which || event.keyCode;
		var last_key_count = this.key_count;
		var k = 0;
		
		var elem = this.tags_list.querySelectorAll("li");

		if (keynum == 40 && this.key_count < elem.length-1) {
			this.key_count += 1;
			k = 1;
		}
		if (keynum == 38 && this.key_count > 0) {
			this.key_count -= 1;
			k = 1;
		}
		if (keynum == 13 && this.key_count) {
			self.set_text(elem[this.key_count]);
			k = 1;
		}
		if (keynum == 39 && this.key_count) {
			self.set_text(elem[this.key_count], true);
			this.key_count = -1;
			self.hidden();
			return;
		}

		if (keynum == 27) {
			this.key_count = -1;
			self.hidden();
			return;
		}
		
		if (k == 1 && this.key_count >= 0) {
			this.focus_block = 1;
			elem[this.key_count].classList.add("autocomplite_active");
			if (last_key_count >= 0) {
				elem[last_key_count].classList.remove("autocomplite_active");
			}
				
			self.set_text(elem[this.key_count]);
		} else {
			this.focus_block = 0;
			if (this.focus_t == null) {
				this.focus_t = setInterval(function() {self.load();}, this.reload_time);
			}
		}
	};
}).apply(AnimePictures);


//Comments
(function(){
	var do_edit = function(comment_id, comment, text_area) {
		var request = function(req) {
			if (req.readyState != 4) {
				return;
			}
			if (req.status != 200) {
				console.log("Network error");
				return;
			}
			var json_req = JSON.parse(req.responseText);
			comment.innerHTML = json_req["html"];
		}
		
		var url = "/pictures/edit_comment/";
		if (comment_id < 0) {
			url = "/pictures/edit_system_comment/";
		}

		ajax_request2(
			url+comment_id,
			{"text": text_area.value},
			request
		);
	}
	this.comments = {
		view_edit: function(comment_id, in_height) {
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				var json_req = JSON.parse(req.responseText),
					comment = get_by_id("comment_text_"+comment_id),
					text_area = document.createElement("textarea"),
					ok_button = document.createElement("button");
				
				ok_button.innerHTML = "Ok";
				comment.innerHTML = "";
				text_area.innerHTML = json_req["source"];
				comment.appendChild(text_area);

				if (in_height == null) {
					in_height = "70%";
				}
				text_area.style.width = "98%";
				text_area.style.height = in_height;
				comment.appendChild(document.createElement("br"));
				comment.appendChild(ok_button);
				ok_button.addEventListener("click", function(){
					do_edit(comment_id, comment, text_area);
				});
			}

			ajax_request2(
				"/pictures/get_comment_source/"+comment_id,
				{},
				request
			);
		},
		del: function(comment_id) {
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				var json_req = JSON.parse(req.responseText);
				if (json_req["success"]) {
					var comment = get_by_id("comment_row_"+comment_id);
					comment.parentNode.removeChild(comment);
				}
			}
			
			ajax_request2(
				"/pictures/del_comment/"+comment_id,
				{},
				request
			);
		},
		add: function() {
			var comment_form = get_by_id("comment_form");
			var comment_text = get_by_id("comment_text");
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				var json_req = JSON.parse(req.responseText);
				if (json_req["success"]) {
					get_by_id("comments").innerHTML = get_by_id("comments").innerHTML+json_req["html"];
					comment_text.value = "";
				} else {
					get_by_id("comment_error").innerHTML = json_req["errormsg"];
				}
			}
			
			ajax_request2(
				comment_form.action,
				{"text": comment_text.value},
				request
			);
		}
	}

}).apply(AnimePictures);


(function(){
	var self = this;
	this.last_url = document.location.href;

	//Vote
	this.post = {
		voting: function(vote, post) {
			if (post==null) {
				post = post_id;
			}
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				var json_req = JSON.parse(req.responseText);
				if (vote == 9) {
					star_it = true;
					get_by_id("rating_star_it").classList.remove("star_it");
					get_by_id("rating_star_it").classList.add("unstar_it");
				} else {
					star_it = false;
					get_by_id("rating_star_it").classList.remove("unstar_it");
					get_by_id("rating_star_it").classList.add("star_it");
				}
				get_by_id("score_n").innerHTML = json_req["score_n"];
			}
			ajax_request2(
				"/pictures/vote",
				{"post": post, "vote":vote},
				request
			);
		},
		//Favorite
		set_favorites: function() {
			var favorite_folder = get_by_id("favorite_folder_select");
			var favorite_status = get_by_id("favorite_status");
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				var json_req = JSON.parse(req.responseText);
				if (json_req["success"]) {
					favorite_status.innerHTML = ts["Ok"];
					if (favorite_folder.value != "Null" &&
						post_juser_id != window.db_user_id &&
						star_it == false) {
						self.post.voting(9)
					}
				} else {
					favorite_status.innerHTML = ts["Error"];
					console.log("Can`t set favorite.");
				}
			}
			ajax_request2(
				"/pictures/set_favorites/"+post_id,
				{"favorite_folder": favorite_folder.value},
				request
			);
		},
		add_tag: function(add_new_tag) {
			var input_tag = get_by_id("add_tag_input");
			var add_tag_status = get_by_id("add_tag_status");
			var post_tags = get_by_id("post_tags");

			add_new_tag = typeof add_new_tag !== 'undefined' ?  add_new_tag : "false";
			if (input_tag.value == "") {
				return;
			}
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				var json_req = JSON.parse(req.responseText);
				if (json_req["success"]) {
					add_tag_status.innerHTML = ts["Ok"];
					post_tags.innerHTML = json_req["post_tags"];
					input_tag.value = "";
					get_by_id("recommend_tags").innerHTML = "";
					// if (add_new_tag) {
					// 	window.open(
					// 		'/pictures/view_edit_tag/'+tag_id,
					// 		ts["Edit tag"]+ " " + get_tag_name(tag_id),
					// 		'width=500,height=700'
					// 	);
					// }
				} else {
					add_tag_status.innerHTML = json_req["errormsg"];
					if (json_req["post_tags"] != null) {
						post_tags.innerHTML = json_req["post_tags"];
					}
					if (json_req["error_new_tag"]) {
						if (confirm(ts["WARNING Add new tag"]+json_req["errormsg"])) {
							self.post.add_tag("true");
						}
					}
					if (json_req["error_new_tag_user"]) {
						alert(ts["ERROR Add new tag"]+json_req["errormsg"])
					}
				}
			}
			ajax_request2(
				"/pictures/add_tag_to_post/"+post_id,
				{"text": input_tag.value, "add_new_tag": add_new_tag},
				request
			);
			return false;
		},
		delete_tag: function(tag_id) {
			var post_tags = get_by_id("post_tags");
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				var json_req = JSON.parse(req.responseText);
				if (json_req["success"]) {
					post_tags.innerHTML = json_req["post_tags"];
				} else {
					console.log("Error");
				}
			}
			
			ajax_request2(
				"/pictures/del_tag_from_post/"+post_id,
				{"tag_id": tag_id},
				request
			);
			return false;
		},
		refresh_tags: function() {
			var post_tags = get_by_id("post_tags");
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				post_tags.innerHTML = req.responseText;
			}

			ajax_request2(
				"/pictures/refresh_post_tags/"+post_id,
				null,
				request
			);
			return false;
		},
		add_pre_tag: function() {
			var input_tag = get_by_id("add_pre_tag_input");
			var add_tag_status = get_by_id("add_pre_tag_status");
			if (input_tag.value == "") {
				return;
			}
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				var json_req = JSON.parse(req.responseText);
				if (json_req["success"]) {
					add_tag_status.innerHTML = ts["Ok"];
					var error_tags = json_req["error_tags"];
					if (error_tags.length > 0) {
						add_tag_status.innerHTML += " " + ts["but we have problems with next tags:"] + "<br>"
					}
					for (var i = 0; i < error_tags.length; i += 1) {
						add_tag_status.innerHTML += "<b>" + error_tags[i].text + "</b>";
						if (error_tags[i].type === 1) {
							add_tag_status.innerHTML +=  " - " + ts["unknown tag"] + "<br>";
						} else if (error_tags[i].type === 2) {
							add_tag_status.innerHTML += " - " + ts["have already in recommendation"] + "<br>";
						} else if (error_tags[i].type === 3) {
							add_tag_status.innerHTML += " - " + ts["have already on picture"] + "<br>";
						}
					}
					input_tag.value = "";
				}
			}
			
			ajax_request2(
				"/pictures/add_pre_tag_to_post/"+post_id,
				{"text": input_tag.value},
				request
			);
			return false;
		},
		get_recommendation_tags: function() {
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					return;
				}
				get_by_id("recommend_tags").innerHTML = req.responseText;
			}
			
			ajax_request2(
				"/pictures/tag_recommendation_for_post/"+post_id,
				{},
				request
			);
		},
		show_curent_rect_timeout: null,
		show_curent_rect: function(point) {
			if (self.post.tag_area) {
				forEach(get_by_id("post_tags").querySelectorAll("a"), function(elem){
					var rect = elem.getAttribute('data-rect');
					if (rect != null) {
						rect = JSON.parse(rect);
						if (point.x > rect[0].x && point.y > rect[0].y && point.x < rect[1].x && point.y < rect[1].y) {
							self.post.tag_area.ex_show_area(rect[0], rect[1], elem.innerHTML, true);
							return;
						}
					}
				});
			}
		},
		init_post: function(ajax) {
			var post = this;
			if (is_login) {
				//Vote
				if (db_user_id != post_juser_id) {
					get_by_id("rating_star_it").addEventListener("click", function(event){
						if (this.classList.contains("star_it")) {
							post.voting(9);
						} else {
							post.voting(0);
						}
					});
				}
				//Comments
				get_by_id("comment_form").addEventListener("submit", self.comments.add);
				//Favorite
				var favorite_folder_select = get_by_id("favorite_folder_select");
				if (favorite_folder_select != null)
					favorite_folder_select.addEventListener("change", post.set_favorites);
				//Tags
				if (get_by_id("add_tag_input")) {
					post.autocomplete_add_tag = new AnimePictures.AutoComplete('add_tag_input', '/pictures/autocomplete_tag', true);
					get_by_id("add_tag_submit").addEventListener("click", post.add_tag);
					get_by_id("add_tag_form").addEventListener("submit", post.add_tag);
					get_by_id("get_recommendation_tags").addEventListener("click", post.get_recommendation_tags);
				}
				if (get_by_id("add_pre_tag_input")) {
					post.autocomplete_add_tag = new AnimePictures.AutoComplete('add_pre_tag_input', '/pictures/autocomplete_tag');
					get_by_id("add_pre_tag_submit").addEventListener("click", post.add_pre_tag);
					get_by_id("add_pre_tag_form").addEventListener("submit", post.add_pre_tag);
				}
				window.addEventListener("message", function(event) {
					if (event.origin !== "https://anime-pictures.net" || event.data.cmd !== "update_tags") {
    					return;
					}
					post.refresh_tags();
				}, false);
			}
			
			if(!ajax) {
				window.addEventListener("popstate", function(event) {
					if (self.last_url != document.location.href) {
						document.location =  document.location;
					}
				});
			}
			
			post.tag_area = new self.TagArea();
			get_by_id("big_preview").addEventListener("mousemove", function(event) {
				if (post.tag_area.edit_area_click1 !== undefined) {
					return;
				}
				if (post.show_curent_rect_timeout) {
					clearTimeout(post.show_curent_rect_timeout)
					post.show_curent_rect_timeout = null;
				}
				var position = getClickPosition(event);

				post.show_curent_rect_timeout = setTimeout(function(){
					post.show_curent_rect(position);
				}, 300);
			});

			get_by_id("post_tags").addEventListener("mouseover", function(event){
				if (event.target.tagName == "A") {
					var rect = event.target.getAttribute("data-rect");
					if (rect != null) {
						rect = JSON.parse(rect);
						post.tag_area.ex_show_area(
							rect[0],
							rect[1],
							event.target.textContent
						);
					}
				}
			});
			get_by_id("post_tags").addEventListener("mouseout", function(event){
				if (event.target.tagName == "A") {
					post.tag_area.ex_hide();
				}
			});
			get_by_id("post_tags").addEventListener("click", function(event){
				var get_tag_name = function(id) {
					return get_by_id("tag_li_"+tag_id).querySelector("a").textContent;
				}

				if (event.target.getAttribute("class") == "icon_delete") {
					var tag_id = event.target.parentNode.getAttribute("data-tag-id");
					if(confirm(ts["Remove the tag?"]+" "+get_tag_name(tag_id))) {
						post.delete_tag(tag_id);
					};
				}

				if (event.target.getAttribute("class") == "icon_frame") {
					var tag_id = event.target.parentNode.getAttribute("data-tag-id");
					post.tag_area.edit_area(function(){
						post.tag_area.send_tag_rect(tag_id);
					});
				}

				if (event.target.getAttribute("class") == "icon_edit") {
					var tag_id = event.target.parentNode.getAttribute("data-tag-id");
					window.open(
						'/pictures/view_edit_tag/'+tag_id,
						ts["Edit tag"]+ " " + get_tag_name(tag_id),
						'width=500,height=700'
					);
				}

			});
		}
	};
}).apply(AnimePictures);

/* Post js section */
(function(){

	this.TagArea = function() {
		var self = this;
		self.big_preview_cont = get_by_id("big_preview_cont");
		self.big_preview = get_by_id("big_preview");
		self.fade_div = null;
		self.real_cont = self.big_preview_cont;
		
		self.cont_position = self.real_cont.getBoundingClientRect();
		self.cont_dem = self.real_cont.getBoundingClientRect();
		self.img_pos = self.big_preview.getBoundingClientRect();
		self.last_top_area = 0;
		self.last_left_area = 0;
			
		return self;
	}

	this.TagArea.prototype.init_area = function() {
		var self = this;
		if (!self.fade_div) {
			var parent_pos = getElementPosition(self.big_preview_cont);
			self.img_pos = getElementPosition(self.big_preview);
			self.img_dem = self.big_preview.getBoundingClientRect();

			self.fade_div = document.createElement("div");
			self.fade_div.id = "fade_div";
			self.fade_div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
			self.fade_div.style.position = "absolute";
			self.fade_div.style.zIndex = "100";
			self.fade_div.style.left = (self.img_pos.x-parent_pos.x)+"px";
			self.fade_div.style.top = (self.img_pos.y-parent_pos.y)+"px";
			self.fade_div.style.width = self.img_dem.width+"px";
			self.fade_div.style.height = self.img_dem.height+"px";
			self.big_preview_cont.appendChild(self.fade_div);
		}
		
	}

	this.TagArea.prototype.reorder_square = function(point1, point2) {
		var left, top, width, height;
		if (point1.x > point2.x) {
			left = point2.x;
			width = point1.x-point2.x;
		} else {
			left = point1.x;
			width = point2.x-point1.x;
		}
		
		if (point1.y > point2.y) {
			top = point2.y;
			height = point1.y-point2.y;
		} else {
			top = point1.y;
			height = point2.y-point1.y;
		}
		return {"left":left, "top":top, "width":width, "height":height};
	}

	this.TagArea.prototype.ex_show_area = function(point1, point2, text, out_hide) {
		if (this.fade_div_onclick == null) {
			this.show_area(point1, point2, text, out_hide);
		}
	}

	this.TagArea.prototype.show_area = function(point1, point2, text, out_hide) {
		var self = this;
		if (self.over_fade_div == null) {
			this.init_area();
			self.over_fade_div = document.createElement("div");
			self.over_fade_div.id = "over_fade_div";
			self.fade_div.appendChild(self.over_fade_div);
		}
		if (text != null && self.over_fade_span == null) {
			self.over_fade_span = document.createElement("span");
			self.over_fade_span.id = "over_fade_span";
			self.fade_div.appendChild(self.over_fade_span);
		}
		
		var square = this.reorder_square(point1, point2);
		
		self.over_fade_div.style.backgroundImage = "url("+self.big_preview.src+")";
		self.over_fade_div.style.left = square.left+"px";
		self.over_fade_div.style.top = square.top+"px";
		self.over_fade_div.style.width = square.width+"px";
		self.over_fade_div.style.height = square.height+"px";
		self.over_fade_div.style.backgroundPosition = (-square.left-2)+"px "+(-square.top-2)+"px";
		
		if (text != null) {
			self.over_fade_span.innerHTML = text;
			var y_position = square.top < 50 ? (square.top+square.height+2) : (square.top-25);
			self.over_fade_span.style.left = square.left+"px";
			self.over_fade_span.style.top = y_position+"px";
		}
		if (out_hide != null) {
			self.over_fade_div_onmouseout = function() {
				self.hide();
			}
			self.over_fade_div.addEventListener("mouseout", self.over_fade_div_onmouseout);
		}
		return self.over_fade_div;
	}

	this.TagArea.prototype.resize_area = function(point1, point2) {
		var square = this.reorder_square(point1, point2);
		if (square.width < 25 || square.height < 25) {
			return;
		}
		this.over_fade_div.style.width = square.width+"px";
		this.over_fade_div.style.height = square.height+"px";
		if (self.last_top_area != square.top || self.last_left_area != square.left) {
			this.over_fade_div.style.left = square.left+"px";
			this.over_fade_div.style.top = square.top+"px";
			this.over_fade_div.style.backgroundPosition = (-square.left-2)+"px "+(-square.top-2)+"px";
		}
		
		self.last_top_area = square.top;
		self.last_left_area = square.left;
	}

	this.TagArea.prototype.ex_hide = function() {
		if (this.fade_div_onclick == null) {
			this.hide();
		}
	}

	this.TagArea.prototype.hide = function() {
		var self = this;
		if (self.fade_div) {
			self.remove_control();
			
			if (self.fade_div_onclick != null) {
				self.fade_div.removeEventListener("click", self.fade_div_onclick);
				delete self.fade_div_onclick;
			}
			if (self.fade_div_onmousemove != null) {
				self.fade_div.removeEventListener("mousemove", self.fade_div_onclick);
				delete self.fade_div_onmousemove;
			}
			if (self.over_fade_div_onmouseout != null) {
				self.over_fade_div.removeEventListener("mouseout", self.over_fade_div_onmouseout);
				delete self.over_fade_div_onmouseout;
			}
			self.fade_div.parentElement.removeChild(self.fade_div);
			delete self.fade_div;
			if (self.over_fade_div != null) {
				delete self.over_fade_div;
			}
			if (self.over_fade_span != null) {
				delete self.over_fade_span;
			}
			self.fade_div = null;
			delete self.done_function;
		}
	}

	this.TagArea.prototype.edit_area = function(done_function) {
		var self = this;
		if (self.fade_div || self.edit_area_click1 != null) {
			self.hide();
			if (self.edit_area_click1!==undefined) {
				delete self.edit_area_click1;
			}
		}
		self.done_function = done_function;
		self.show_area({x: 100, y: 100}, {x: 200, y: 200});
		self.selection_area = {s_p1: {x: 100, y: 100}, s_p2: {x: 200, y: 200}};
		self.fade_div.style.cursor = "pointer";
		self.show_control();

		self.fade_div_onclick = function(event){
			var position = getClickPosition(event);
			if (self.edit_area_click1 == null) {
				self.hide_control();
				self.edit_area_click1 = position;
				self.resize_area(self.edit_area_click1, {x: self.edit_area_click1.x+25, y: self.edit_area_click1.y+25});
			} else {
				self.selection_area = {s_p1: self.edit_area_click1, s_p2: position};
				delete self.edit_area_click1;
				self.resize_area(self.selection_area.s_p1, self.selection_area.s_p2);
				self.show_control();
			}
		};
		self.fade_div.addEventListener("click", self.fade_div_onclick);
		
		self.fade_div_onmousemove = function(event){
			var position = getClickPosition(event);
			if (self.edit_area_click1 !== undefined) {
				self.resize_area(self.edit_area_click1, position);
			}
		};
		self.fade_div.addEventListener("mousemove", self.fade_div_onmousemove);
	}

	this.TagArea.prototype.show_control = function() {
		var self = this;
		if (self.selection_area !== undefined || self.control_div === undefined) {
			self.control_div = document.createElement("div");
			self.control_div.id = "control_div";
			self.fade_div.appendChild(self.control_div);

			var square = this.reorder_square(self.selection_area.s_p1, self.selection_area.s_p2);
			self.control_div.style.left = square.left+square.width+5+"px";
			self.control_div.style.top = square.top+(square.height-32*2)+"px";

			self.control_cancel = document.createElement("span");
			self.control_cancel.title = ts["Cancel"];
			self.control_cancel.className = "icon_close";
			self.control_cancel.style.cursor = "pointer";

			self.control_done = document.createElement("span");
			self.control_done.title = ts["Done"];
			self.control_done.className = "icon_apply";
			self.control_done.style.cursor = "pointer";

			self.control_trash = document.createElement("span");
			self.control_trash.title = ts["Remove area"];
			self.control_trash.className = "icon_area_trash";
			self.control_trash.style.cursor = "pointer";

			self.control_div.appendChild(self.control_cancel);
			self.control_div.appendChild(self.control_done);
			self.control_div.appendChild(self.control_trash);

			self.control_cancel_onclick = function() {
				self.hide();
			}
			self.control_cancel.addEventListener("click", self.control_cancel_onclick);
			self.control_done_onclick = function() {
				self.remove_control();
				self.fade_div.removeEventListener("click", self.fade_div_onclick);
				self.fade_div_onclick = null;
				self.done_function();	
			}
			self.control_done.addEventListener("click", self.control_done_onclick);

			self.control_trash_onclick = function() {
				self.remove_control();
				self.fade_div.removeEventListener("click", self.fade_div_onclick);
				self.fade_div_onclick = null;
				self.selection_area = {s_p1: {x: 0, y: 0}, s_p2: {x: 0, y: 0}};
				self.done_function();	
			}
			self.control_trash.addEventListener("click", self.control_trash_onclick);
		}
		if (self.selection_area !== undefined || self.control_div !== undefined) {
			var square = this.reorder_square(self.selection_area.s_p1, self.selection_area.s_p2);
			self.control_div.style.left = square.left+square.width+5+"px";
			self.control_div.style.top = square.top+(square.height-34*3+4)+"px";
			self.control_div.style.visibility = "visible";
		}
	}

	this.TagArea.prototype.hide_control = function() {
		if (this.control_div !== undefined) {
			this.control_div.style.visibility = "hidden";
		}
	}

	this.TagArea.prototype.remove_control = function() {
		if (this.control_div != null) {
			if (this.control_cancel_onclick != null) {
				this.control_cancel.removeEventListener("click", this.control_cancel_onclick);
				delete this.control_div_onclick;
			}
			if (this.control_done_onclick != null) {
				this.control_done.removeEventListener("click", this.control_done_onclick);
				delete this.control_done_onclick;
			}
			if (this.control_trash_onclick != null) {
				this.control_trash.removeEventListener("click", this.control_trash_onclick);
				delete this.control_trash_onclick;
			}
			this.control_div.parentElement.removeChild(this.control_div);
			delete this.control_div;
		}
	}

	this.TagArea.prototype.send_tag_rect = function(tag_id) {
		var self = this;
		var square = this.reorder_square(self.selection_area.s_p1, self.selection_area.s_p2);
		var toSend = {
			"tag_id":tag_id, 
			"post_id":post_id,
			"s_x1":parseInt(square.left),
			"s_y1":parseInt(square.top),
			"s_x2":parseInt(square.left+square.width),
			"s_y2":parseInt(square.top+square.height)
		};
		var request = function(req) {
			self.hide();
			if (req.readyState != 4) {
				return;
			}
			if (req.status != 200) {
				console.log("Network error");
				return;
			}
			var json_req = JSON.parse(req.responseText);
			if (json_req["success"]) {
				post_tags.innerHTML = json_req["post_tags"];
			} else {
				console.log("Error");
			}
		}
		
		ajax_request2(
			"/pictures/set_tag_rect",
			toSend,
			request
		);
	};
}).apply(AnimePictures);


(function(){
	var self = this;

	var roundNumber = function (rnum, rlength) {
		return Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
	};

	var multi_action = function(action) {
		var request = function(req) {
			if (req.readyState != 4) {
				return;
			}
			if (req.status != 200) {
				console.log("Network error");
				return;
			}
			window.location.href = window.location.href;
		}
		var toSend = {"action":action};
		if (action == "add_tags") {
			toSend["text"] = get_by_id("multi_tags").value;
		}
		forEach(get_by_id("posts").querySelectorAll("input"), function(checkbox) {
			if (checkbox.checked) {
				toSend[checkbox.name] = checkbox.value;
			}
		});
		ajax_request2(
			"/pictures/multi_action",
			toSend,
			request
		);
		get_by_id("multi_add_tags").disabled = true;
		get_by_id("multi_set_public").disabled = true;
		get_by_id("multi_check_all").disabled = true;
	};

	this.post_list = {
		refresh: function(url, form, push_state) {
			if (self.autocomplete_search_tag != null) {
				self.autocomplete_search_tag.hidden();
			};
			if (!history.pushState) {
				return true;
			};
			var push_state = typeof(push_state) != 'undefined' ? push_state : true;
			var toSend = {"ajax": 1};
			
			var request = function(req) {
				if (req.readyState != 4) {
					return;
				}
				if (req.status != 200) {
					console.log("Network error");
					get_by_id("page_load_progress").innerHTML="Network error";
					return;
				}
				get_by_id('posts').innerHTML = req.responseText;

				get_by_id("page_load_progress").style.visibility = "hidden";
				
				if (push_state) {
					if (form) {
						var page = parseInt(toSend["page"], 10);
						delete toSend["ajax"];
						delete toSend["page"];
						delete toSend["hex_color"];
						history.pushState({}, "", url.replace("view_posts", "view_posts")+'/'+page+'?'+queryString(toSend));
					} else {
						history.pushState({}, "", url.replace("view_posts", "view_posts"));
					}
				}
				
				get_by_id("page_load_progress").innerHTML="";
				self.init_subscribe_tag();
				window.scroll(0, 0);

				
				self.last_url = document.location.href;
			}

			var last_post, curent_page, need_page, pathArray;

			if (form) {
				for( var i = 0; i < form.elements.length; i++) {
					if (form.elements[i].name) {
						if (form.elements[i].type=='radio'||form.elements[i].type == 'checkbox') {
							if (form.elements[i].checked) {
								toSend[form.elements[i].name] = form.elements[i].value;
							}
						} else {
							if (form.elements[i].value != "" && form.elements[i].type != 'submit') {
								toSend[form.elements[i].name] = form.elements[i].value;
							}
						}
					}
				}
			} else {
				last_post = document.querySelector(".posts_block > span:last-child");
				pathArray = window.location.pathname.split( '/' );
				curent_page = parseInt(pathArray[pathArray.length-1]);
				if (url.pathname == null) {
					pathArray = url.split( '/' );
					need_page = parseInt(pathArray[pathArray.length-1].match(/(\d*)\?/i)[1]);
				} else {
					pathArray = url.pathname.split( '/' );
					need_page = parseInt(pathArray[pathArray.length-1]);
				}

				if (need_page > curent_page) {
					toSend["last_page"] = curent_page;
					toSend["last_post_date"] = last_post.getAttribute("data-pubtime");
					console.log(curent_page, need_page);
				}
			}
			
			toSend["lang"] = lang;

			if (toSend['search_tag'] != null && toSend['search_tag'] != "")
				document.title = toSend['search_tag'] + " " + ts['posts_title'];
			else
				document.title = ts['posts_title'];
			ajax_request2(
				form ? url + '/' : url,
				toSend,
				request
			);
			get_by_id("page_load_progress").style.visibility = "visible";
			return false;
		},
		init: function(ajax) {
			if(!ajax) {
				window.addEventListener("popstate", function(event) {
					if (self.last_url != document.location.href) {
						console.log(document.location.href, self.last_url);
						if (document.location.href.search("view_posts") >= 0) {
							if (self.last_url.search("view_posts") >= 0) {
								self.post_list.refresh(document.location, false, false);
							} else {
								self.last_url = document.location.href;
							}
							return true;
						}
					}
				});
			}

			get_by_id('aspect').addEventListener("click", function() {
				if (get_by_id('res_x_id').value != '' && get_by_id('res_y_id').value != '') {
					var width = get_by_id('res_x_id').value,
						height = get_by_id('res_y_id').value;
					this.value = roundNumber(width/height, 2);
				};
			});

			get_by_id('myColor').addEventListener("change", function() {
				var rgb = hexToRgb(this.value);
				get_by_id('rgb_color').value = rgb.r + '_' + rgb.g + '_' + rgb.b + '_150';
			});

			get_by_id('clear_color').addEventListener("click", function() {
				var my_color = get_by_id('myColor');
				get_by_id('rgb_color').value = "";
				my_color.value = "#000000";
			});
			
			self.autocomplete_search_tag = new AnimePictures.AutoComplete('search_tag_input', '/pictures/autocomplete_tag', false);
			self.autocomplete_denied_tag = new AnimePictures.AutoComplete('denied_tag_input', '/pictures/autocomplete_tag');
			if (is_moderator) {
				self.autocomplete_multi_tags = new AnimePictures.AutoComplete('multi_tags', '/pictures/autocomplete_tag');
			}
			get_by_id('auto_resolution').addEventListener("click", function() {
				get_by_id('res_x_id').value = screen.width;
				get_by_id('res_y_id').value = screen.height;
				get_by_id('aspect').value = roundNumber(screen.width/screen.height, 2);
				get_by_id('res_x_1_id').checked = 'checked';
				get_by_id('res_y_1_id').checked = 'checked';
			});
			
			var activate_tag_input = function() {
				self.active_tag_input = this;
			}

			get_by_id('search_tag_input').addEventListener("blur", activate_tag_input);
			get_by_id('denied_tag_input').addEventListener("blur", activate_tag_input);

			get_by_id('push_or').addEventListener("click", function() {
				var tag_input = self.active_tag_input;
				if (tag_input == null) {
					tag_input = get_by_id('search_tag_input');
				}
				tag_input.value += "||";
				tag_input.focus();
			});
			get_by_id('push_and').addEventListener("click", function() {
				get_by_id('search_tag_input').value += "&&";
				get_by_id('search_tag_input').focus();
			});

			get_by_id("optional_form_trigger").addEventListener("click", function(event) {
				event.preventDefault();
				get_by_id('optional_form').classList.add('optional_form_active');
			});
			get_by_id("search_form").addEventListener("submit", function(event) {
				event.preventDefault();
				self.post_list.refresh('/pictures/view_posts', this);
			});
			if (is_moderator) {
				get_by_id('multi_check_all').addEventListener("click", function() {
					forEach(get_by_id("posts").querySelectorAll("input"), function(checkbox) {
						if (checkbox.checked) {
							checkbox.checked = false;
						} else {
							checkbox.checked = true;
						}
					});
				});
				get_by_id('multi_add_tags').addEventListener("click", function() {
					multi_action("add_tags");
				});
				get_by_id('multi_set_public').addEventListener("click", function() {
					multi_action("set_public");
				});
			}
		}
	};
}).apply(AnimePictures);

(function(){
	this.login = function() {
		var request = function(req) {
			if (req.readyState != 4) {
				return;
			}
			if (req.status != 200) {
				console.log("Network error");
				get_by_id("form_login_error").innerHTML = 'Network error';
				return;
			}
			var json_req = JSON.parse(req.responseText);
			if (json_req["success"]) {
				if (window.location.toString().search("login")>=0) {
					window.location = "/";
				} else {
					window.location.reload();
				}
			} else {
				get_by_id("form_login_error").innerHTML = json_req["errormsg"];
			}
		}

		var to_send = {
			"login":get_by_id("form_login_login").value,
			"password":get_by_id("form_login_password").value,
			"time_zone":time_zone
		};

		ajax_request2(
			this.action,
			to_send,
			request
		);
	};
}).apply(AnimePictures);

if (window.is_login != null && !is_login) {
	document.addEventListener("DOMContentLoaded", function() {
		var form_login = get_by_id("form_login");
		if (form_login != null)
			form_login.addEventListener("submit", AnimePictures.login);
	});
}

AnimePictures.gen_preview_url = function(data, size) {
	if (data.ext == ".gif") {
		return images_preview_host+"/jvwall_images/"+data.md5.substr(0, 3)+"/"+data.md5+"_"+size+".gif";
	} else if (data.have_alpha) {
		return images_preview_host+"/jvwall_images/"+data.md5.substr(0, 3)+"/"+data.md5+"_"+size+".png";
	} else {
		return images_preview_host+"/jvwall_images/"+data.md5.substr(0, 3)+"/"+data.md5+"_"+size+".jpg";
	}
};

AnimePictures.realtime_stars = function() {
	var body = get_by_id("sidebar_last_scores_body");
	if(body == null) {
		return;
	}
	var erotic_level = 0;
	if(window.post_erotic_level != null) {
		erotic_level = window.post_erotic_level;
	}
	var post_w_id = -1;
	if(window.post_id != null) {
		post_w_id = window.post_id;
	}

	var protocol = "wss://";
	if(window.location.hostname == "localhost") {
		protocol = "ws://";
	}
	AnimePictures.realtime_stars_ws = new WebSocket(protocol+window.location.hostname+"/realtime_stars?erotic_level="+erotic_level+"&post_id="+post_w_id);
	var onopen = function() {
		console.log("Open socket");
	};
	var onmessage = function (evt) {
		if (evt.type=="close") {
			console.log("close event");
			return;
		}
		var need_expand = false;

		var create_user = function(post_now, data, need_expand) {
			var user_block = document.createElement("span");
			user_block.setAttribute("id", "post_user_"+data.id);

			if (!need_expand) {
				user_block.appendChild(document.createTextNode(", "));
			}
			var user_link = document.createElement("a");
			user_link.appendChild(document.createTextNode(data.name));
			user_link.setAttribute("href", "/profile/view_ext_profile/"+data.id+"?lang="+lang);
			
			user_link.className = "user_link";
			if (data.groups.indexOf("commiter") >= 0) {
				user_link.style.color = "#0000cc";
			}
			if(data.groups.indexOf("moderator") >= 0) {
				user_link.style.color = "#00aa00";
			}
			if(data.groups.indexOf("admin") >= 0) {
				user_link.style.color = "#ff0000";
			}
			user_block.appendChild(user_link);
			post_now.appendChild(user_block);
		};

		var data = JSON.parse(evt.data);
		if(data.type == "new_star") {
			var block = document.createElement("a");
			block.className = "last_scores_image";
			block.style.maxHeight = "0";
			block.style.boxShadow = "0 0 20px 2px rgb("+data.color_r+", "+data.color_g+", "+data.color_b+")";
			block.setAttribute("href", "/pictures/view_post/"+data.post+"?lang="+lang);

			var block_div = document.createElement("div");
			block_div.style.backgroundColor = "rgb("+data.color_r+", "+data.color_g+", "+data.color_b+")";
			block_div.style.backgroundImage = "url('"+AnimePictures.gen_preview_url(data, "cp")+"')";
			if (data.spoiler === true && block_div.style.filter != null) {
				block_div.style.filter = "blur(12px)";
			}
			block.appendChild(block_div);

			body.insertBefore(block, body.firstChild);
			body.removeChild(body.lastChild);
			if (data.mp_users != null) {
				get_by_id("mp_users").innerHTML = data.mp_users;
			}
			setTimeout(function(){
				block.style.maxHeight = "200px";
			}, 100);
		} else if (data.type == "new_post_user") {
			//console.log("New user:", data);
			var post_now = document.getElementById("post_now_watching");
			if (post_now != null) {
				if (post_now.children.length == 0) {
					need_expand = true;
				}
				create_user(post_now, data, need_expand);
				if (need_expand) {
					post_now.style.maxHeight = "600px";
					post_now.style.padding = "10px";
				}
			}
		} else if (data.type == "del_post_user") {
			//console.log("Del user:", data);
			var post_now = document.getElementById("post_now_watching");
			if (post_now != null) {
				var user = document.getElementById("post_user_"+data.id);
				if (user != null) {
					post_now.removeChild(user);
				}
				if (post_now.children.length == 0) {
					post_now.style.maxHeight = "0";
					post_now.style.padding = "0";
				}
			}
		} else if (data.type = "all_post_users") {
			//console.log("All users:", data);
			var post_now = document.getElementById("post_now_watching");
			if (post_now != null && Object.keys(data.users).length > 0) {
				if (post_now.children.length == 0) {
					need_expand = true;
				}
				var need_comma = need_expand;
				for (var user_id in data.users) {
					create_user(post_now, data.users[user_id], need_comma);
					need_comma = false;
				}
				if (need_expand) {
					post_now.style.maxHeight = "600px";
					post_now.style.padding = "10px";
				}
			}
		}
	};
	var onclose = function() {
		console.log("Socket close");
	};
	AnimePictures.realtime_stars_ws.onopen = onopen;
	AnimePictures.realtime_stars_ws.onmessage = onmessage;
	AnimePictures.realtime_stars_ws.onclose = onmessage;
}

document.addEventListener("DOMContentLoaded", function() {
	var mobile_menu_icon = get_by_id("mobile_menu_icon");
	if (mobile_menu_icon != null) {
		mobile_menu_icon.addEventListener("click", function(event) {
			event.preventDefault();
			var mobile_menu = get_by_id("mobile_menu");
			mobile_menu.classList.toggle("activate");
		});
	}

	AnimePictures.realtime_stars();
});

//Subscribe tag
(function(){
	this.subscribe_tag = function(event) {
		event.preventDefault();
		var posts_body_head_subaction = get_by_id("posts_body_head_subaction"),
			action = posts_body_head_subaction.getAttribute("data-action"),
			tag_id = posts_body_head_subaction.getAttribute("data-id"),
			tag_name = posts_body_head_subaction.getAttribute("data-name");

		
		var request = function(req) {
			if (req.readyState != 4) {
				return;
			}
			if (req.status != 200) {
				console.log("Network error");
				alert("Network error");
				return;
			}
			var json_req = JSON.parse(req.responseText);
			if (json_req["success"]) {
				if (action == "subscribe") {
					posts_body_head_subaction.setAttribute("data-action", "unsubscribe");
					posts_body_head_subaction.textContent = ts["unsubscribe"];
				} else {
					posts_body_head_subaction.setAttribute("data-action", "subscribe");
					posts_body_head_subaction.textContent = ts["subscribe"];
				}
			} else {
				alert(json_req["errormsg"]);
			}
		}

		if (action == "subscribe")
			ajax_request2(
				"/profile/add_tag_subscribe",
				{"name": tag_name},
				request,
				"POST"
			);
		else
			ajax_request2(
				"/profile/del_tag_subscribe/"+tag_id,
				{},
				request,
				"GET"
			);
	}

	this.init_subscribe_tag = function() {
		var posts_body_head_subaction = get_by_id("posts_body_head_subaction");
		if (posts_body_head_subaction != null) {
			posts_body_head_subaction.addEventListener("click", this.subscribe_tag);
		}
	};
}).apply(AnimePictures);

var isPushEnabled = false;

Notification.requestPermission().then(function(result) {
	if (!window.is_login) {
		return;
	}
	if (result === 'denied') {
		console.log('Permission wasn\'t granted. Allow a retry.');
		if(localStorage.getItem("is_push_enabled") == "true")
			localStorage.setItem("is_push_enabled", "false");
		return;
	}
	if (result === 'default') {
		console.log('The permission request was dismissed.');
		if(localStorage.getItem("is_push_enabled") == "true")
			localStorage.setItem("is_push_enabled", "false");
		return;
	}
	window.addEventListener('load', function() {  
		if ('serviceWorker' in navigator && typeof(Storage) !== "undefined") {
			console.log('Service Worker is supported');
			navigator.serviceWorker.register(js_cdn_host+'/service-worker.js?v=28').then(function(reg) {
				if (localStorage.getItem("is_push_enabled") != "true" || (localStorage.getItem("is_push_enabled_withuser") == "false" && window.is_login != null && is_login) ) {
					return reg.pushManager.subscribe({
						userVisibleOnly: true
					}).then(function(sub) {
						var keys = JSON.parse(JSON.stringify(sub));
						//console.log(JSON.stringify(sub));
						//console.log(sub);
						//console.log('endpoint:', sub.endpoint);
						var request = function(req) {
							if (req.readyState != 4) {
								return;
							}
							if (req.status != 200) {
								console.log("Network error");
								return;
							}
							var json_req = JSON.parse(req.responseText);
							if (!json_req["success"]) {
								console.log("Server error");
							} else {
								localStorage.setItem("is_push_enabled", "true");
								if (window.is_login != null && is_login) {
									localStorage.setItem("is_push_enabled_withuser", "true");									
								} else {
									localStorage.setItem("is_push_enabled_withuser", "false");
								}
							}
						}
						ajax_request2(
							"/login/register_web_token",
							{
								"endpoint": keys["endpoint"],
								"auth": keys["keys"]["auth"],
								"p256dh": keys["keys"]["p256dh"]
							},
							request
						);

						reg.active.postMessage({"type": "lang", "lang": lang});
					});
				} else {
					console.log("web push is enabled");
					reg.active.postMessage({"type": "lang", "lang": lang});
				}
			}).catch(function(error) {
				console.log(':^(', error);
			});
		}
	});
});



