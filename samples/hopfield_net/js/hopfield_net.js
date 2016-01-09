function hopfield_net(n) {
	// * lernen von N patterns q^1 bis q^N
	// * jede Komponente q^j_i Element von {-1,1} repräsentiert ein Pixel
	// * bei n Pixeln werden n Neuronen verwendet 
	// * vollständige Vernetzung aller neuronen (außer mit sich selbst )

	var _n=0; // number of pattern elements
	var _N=0; // number of patterns
	var _initialized = false;
	var _weight;
	//var _pattern; // = new Array(_n);
	_n = n; _node = new Array(_n);
	_weight = new Array(_n); // 1d Array
	for (var i=0; i<_n; i++) {
		_weight[i]=new Array(_n); // 2d Array
	}				
	for (var i=0; i<_n; i++) {
		for (var j=0; j<_n; j++) {
			_weight[i][j]=0;
		}
	}

	// wird noch doppeld multipliziert und aufsummiert
	function _learn(pattern) {
		_N++;
		for(var i=0; i<_n; i++) {
			for(var j=0; j<_n; j++) {
				if(j==i) {
					_weight[i][j]=0;
				}
				else {
					_weight[i][j] = _weight[i][j] + pattern[i]*pattern[j];
					// _n;// -> kein Faktor 1/n wie in Grundkurs Intelligenz 
					// - Wolfgang Ertl
				}
			}
		}
		//console.log("weights " + _weight);
	}
			
	function _query(pat) {
		_node = pat
		/*for (i=0; i<_n; i++) {
				_node[i] = pat[i];
		}*/
		// pseudo random number from 0 to 9
		var rand_num = Math.round(Math.random()*(_n-1));
		for (var j=0; j<_n; j++) {
			_node[rand_num] = _node[rand_num] + _weight[rand_num][j]*_node[j];			
		}
		if (_node[rand_num] > 0) {
			_node[rand_num] = 1;
		} else {
			_node[rand_num] = -1;
		}
		//console.log(rand_num);
	}
		
	function _init() {
		var rand_num;
		for (i=0; i<_n; i++) {
			rand_num = Math.round(Math.random()*(1));
			if (rand_num==0) {
				_node[i] = -1;
			} else {
				_node[i] = 1;
			}
		}
	}

	return {
		init: function(){_init()},
		learn: function(p){_learn(p);},
		query: function(p){_query(p);},
		get_node: function(){return _node;},
	}
}
