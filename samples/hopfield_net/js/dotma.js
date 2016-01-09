function matrixUI() {//num_x, num_y, diam, context) {
	var _name = "defaul";
	var _created = false;
	var _canvas;// = document.getElementById(context);
	var _context;// = _canvas.getContext('2d');
	var _num_x = 8;
	var _num_y = 8;
	var _diam;
	var _form;

	// Data of all matrix 
	// elements is stored
	// in this variable			
	var _matrix; 

	// colors of elements	
	var color_set = '#880000' // defaults to red 
	var color_unset = '#888888'  // defaults to grey

	// function to draw circle in 
	// context within this scope
	function _circle(x,y,r,color) {
		_context.beginPath();
		_context.arc(x, y, r, 0, 2 * Math.PI, false);
		_context.fillStyle = color;
		_context.fill();
		//_context.lineWidth = 3;
		//_context.strokeStyle = '#003300';
		//_context.stroke();
	}

	// draw circle matrix 
	function _set_form() {
		// draw (circle) matrix
		function _circle_matrix(diam) {
			// automatically set width and 
			// height to fit matrixUI
			_diam = diam;
			_canvas.width = _num_x*_diam;
			_canvas.height = _num_y*_diam;
			for (var i=0; i<_num_x; i++) {
				for (var j=0; j<_num_y; j++) {
					_circle(	diam/2+i*diam,
										diam/2+j*diam, 
										diam/2,color_unset);
			}
		}
	}
	return {
		circ: function(diam) {_circle_matrix(diam)}//,
		//square: function(length) {_rect_matrix(length)}//,
		//img: function(path) {_img_matrix(path)}
		}
	}
		
	//click matrix (change values)
	//activate/deactivate clickability

	function _set_element(x,y,bool_flag) {
		_matrix[x][y]=bool_flag;
		if (bool_flag==true) {
			_circle(	_diam/2+x*_diam,
								_diam/2+y*_diam,
								_diam/2, color_set)
		} else {
			_circle(	_diam/2+x*_diam,
								_diam/2+y*_diam,
								_diam/2, color_unset)
		}
	}	

	return {
		create: function(num_x, num_y, name) { // call only once
			if (_created == false) {
				// matrix has been created now
				_created = true;

				// set context of canvas
				_name = name;
				_canvas = document.getElementById(_name);
				if (_canvas) {
					_context = _canvas.getContext('2d');
				} else {
					console.log("Canvas <" + _name + "> not found! If <.create_canvas_div> or <.create_canvas_body> is called next, this error may be ignored");
				}
									
				// set number of rows and columns
				_num_x = num_x;
				_num_y = num_y;
	
				// create array, which contains coresponding
				// bool-values of all matrix-elements
				_matrix = new Array(_num_x);  // 1d array
 				for (var i = 0; i < 10; i++) {
 					_matrix[i] = new Array(_num_y); // 2d array
   			}
				// TODO: Predefine whole array
			} else {
				console.log("matrixUI <" + _name + "> has been created already.");
			}
		},
		create_canvas_div: function(class_name, div_name) { // note: this function possibly is not supported by all browsers
			//if (_created == true) {
				canvas = document.createElement('canvas');
				div = document.getElementById(div_name);	
				canvas.id = _name;
				canvas.className = class_name;
				div.appendChild(canvas);
				
				_canvas = document.getElementById(_name);	
				_context = _canvas.getContext('2d');
				//} else {
				//console.log("Call member create(num_x, num_y, name) before calling any other function.");
				//}
		},
		create_canvas_body: function(class_name) { // note: this function possibly is not supported by all browsers
			//if (_created == true) {
				canvas = document.createElement('canvas');
				//div = document.getElementById(div_name);  
				canvas.id = _name;
				canvas.className = class_name;
				document.body.appendChild(canvas);
             
				_canvas = document.getElementById(_name); 
				_context = _canvas.getContext('2d');
			//} else {
				//console.log("Call member create(num_x, num_y, name) before calling any other function.");
			//}
		},
		set_form: function(){return form = _set_form()},
		get_matrix: function() {
			// return matrix 
			// by value
			var m = [];
			for (var i=0; i<_matrix.length; i++) {
				m[i] = _matrix[i].slice();
			}
			return m;
			//return _matrix
		},
		set_matrix: function(value){
			_matrix = value;
			for (var i=0; i<_num_x; i++) { 
				for (var j=0; j<_num_y; j++) { 
				 	_set_element(i,j,_matrix[i][j]);	
				}
			}
		},
		set_color_set: function(color) { 
			color_set = color;
		},
		set_color_unset: function(color) {
			color_unset = color;
		},
		set_element: function(x,y,bool_flag) {
			return _set_element(x,y,bool_flag)
		},
		get_element: function(x,y) {
			return _matrix[x][y];
		},
		set_row: function(y,row_val,bool_flag) {
			var bit=1;
			for(var i=0; i<_num_x; i++) {
				_matrix[i][y]=bool_flag;
				if (row_val & bit) {
					_set_element(i,y,bool_flag);
				} else {
					_set_element(i,y,!bool_flag);
				}
				bit=1<<(i+1); // i<32
			}
		}
	};
				
}
