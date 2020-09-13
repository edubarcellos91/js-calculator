var flag = "0" /*For the dot system*/
function button1(button) {
	flag = "0";
	if (document.calc.view.value == "0") {
		document.calc.view.value = button;
		if (document.calc.view.value == ".") {
			document.calc.view.value = document.calc.view.value.replace(".","0.");
			flag = "1";
		}
	} else {
		if (flag == "1") {
			if (button == ".") {
				button = "";
			}
		}
		if (document.calc.view.value.indexOf("√(") != "-1") {
			if (document.calc.view.value[document.calc.view.value.indexOf("√(")-1] != ")") {
				document.calc.view.value = document.calc.view.value.replace(/\s/g,"");
				document.calc.view.value = document.calc.view.value.slice(0,document.calc.view.value.indexOf("√("));
				document.calc.view.value += button + "√(";
			} else {
				button2(button);
			}
		} else {
			button2(button);
		}
	}
	if (button == ".") {
		flag = "1";
	}
	else if (isNaN(button)) {
		flag = "0";
	}
}
function button2(button) {
	document.calc.view.value += button;
}
function del() {
	if (document.calc.view.value.length > 1 || document.calc.view.value == "-") {
		document.calc.view.value = document.calc.view.value.slice(0,-1);
	} else {
		clean();
	}
}
function clean() {
	document.calc.view.value = "0";
}
function change(x,y) {
	document.calc.view.value = document.calc.view.value.replace(x,y);
}
function dot_complete() {
	for (var i = 0; i < indexes.length; i++) {
		if (isNaN(document.calc.view.value[indexes[i] - 1])) {
			document.calc.view.value = document.calc.view.value.slice(0,indexes[i]) + "0" + document.calc.view.value.slice(indexes[i]);
		}
	}
}
function last_numbers() {
	var n = "";
	var i = document.calc.view.value.length;
	while (!isNaN(document.calc.view.value[i - 1]) || document.calc.view.value[i - 1] == ".") {
		if (n == "") {
			n = document.calc.view.value[i - 1];
		} else {
			n = document.calc.view.value[i - 1] + n;
		}
		i--;
	}
	return n;
}
function minus_plus_aux() {
	var num = last_numbers(num);
	document.calc.view.value = document.calc.view.value.slice(0,document.calc.view.value.length - num.length);
	if (document.calc.view.value[document.calc.view.value.length - 1] == "-") {
		document.calc.view.value = document.calc.view.value.slice(0,-1);
		if (document.calc.view.value[document.calc.view.value.length - 1] == "(") {
			document.calc.view.value = document.calc.view.value + num;
		} else {
			document.calc.view.value = document.calc.view.value + "+" + num;
		}
	}
	else if (document.calc.view.value[document.calc.view.value.length - 1] == "+") {
		document.calc.view.value = document.calc.view.value.slice(0,-1);
		document.calc.view.value = document.calc.view.value + "-" + num;
	}
	else if (document.calc.view.value[document.calc.view.value.length - 1] == "(") {
		document.calc.view.value = document.calc.view.value + "-" + num;
	} else {
		document.calc.view.value = document.calc.view.value + "(";
		document.calc.view.value = document.calc.view.value + "-" + num;
	}
}
function minus_plus() {
	if (document.calc.view.value[document.calc.view.value.length - 1] == ")") {
		document.calc.view.value = document.calc.view.value.slice(0,-1);
		minus_plus_aux();
		document.calc.view.value = document.calc.view.value + ")";
	} else {
		minus_plus_aux();
	}
}
function root_view() {
	if (document.calc.view.value == "0") {
		document.calc.view.value = "(2)√(";
	} else {
		document.calc.view.value += "(2)√(";
	}
}
function root() {
	if (document.calc.view.value.indexOf("√") != "-1") {
		var e = document.calc.view.value.split("(")[1].split(")√")[0];
		var num = document.calc.view.value.split("√(").pop().split(")")[0];
		var root_value = Math.pow(num,1/e);
		change("(" + e + ")√(" + num + ")", root_value);
	}
}
function root_n() {
	if (document.calc.view.value == "0") {
		document.calc.view.value = "";
		document.calc.view.value = "( " + "√(";
	} else {
		document.calc.view.value += document.calc.view.value + "( " + "√(";
	}
}
function exp() {
	if (document.calc.view.value == "0" || (isNaN(document.calc.view.value[document.calc.view.value.length - 1]) && document.calc.view.value[document.calc.view.value.length - 1] != ")")) {
		return;
	} else {
		document.calc.view.value += "E";
	}
}
function e_pi(x) {
	if (!isNaN(document.calc.view.value[document.calc.view.value.indexOf(x) - 1])) {
		document.calc.view.value = document.calc.view.value.slice(0,document.calc.view.value.indexOf(x)) + "*" + document.calc.view.value.slice(document.calc.view.value.indexOf(x));
	}
}
function ex() {
	if (document.calc.view.value == "0") {
		document.calc.view.value = "e^(";
	}
	else if (!isNaN(document.calc.view.value[document.calc.view.value.length - 1])) {
		document.calc.view.value += "xe^(";
	} else {
		document.calc.view.value += "e^(";
	}
}
function factorialize(x) {
	if (x == 0) {
		return 1;
	} else {
		return x * factorialize(x-1);
	}
}
function factorialize_calc() {
	for (var i of indexes) {
		var f = x = "";
		var j = 1;
		while (!isNaN(document.calc.view.value[i-j])) {
			f = document.calc.view.value[i-j] + f;
			j++;
		}
		x = factorialize(f-1);
		document.calc.view.value = document.calc.view.value.slice(0,i)
		+ "(" + x + ")" + document.calc.view.value.slice(i + 1);
	}
}
function factorialize_replace(i,x) {
	document.calc.view.value = document.calc.view.value.substr(0,i) + "(" + x + ")"
	+ document.calc.view.value.substr(i + document.calc.view.value.length);
}
function logarithm(log) {
	if (document.calc.view.value == "0") {
		document.calc.view.value = log + "(";
	} else {
		if (!isNaN(document.calc.view.value[document.calc.view.value.length - 1])) {
			document.calc.view.value = document.calc.view.value + "x" + log + "(";
		} else {
			document.calc.view.value = document.calc.view.value + log + "(";
		}
	}
}
function log_calc() {
	var num = document.calc.view.value.split("log(").pop().split(")")[0];
	var log_value = Math.log10(num);
	change("log(" + num + ")", log_value);
}
function ln_calc() {
	var num = document.calc.view.value.split("ln(").pop().split(")")[0];
	var log_value = Math.log(num);
	change("ln(" + num + ")", log_value);
}
function parentheses_remove() {
	while (document.calc.view.value[document.calc.view.value.length -1] == "(") {
		document.calc.view.value = document.calc.view.value.slice(0,-1);
	}
}
function indexes_find(n,s) {
	for (i = n; i <= document.calc.view.value.length; i = ind + 1) {
		var ind = document.calc.view.value.indexOf(s,i);
		if (ind != -1) {
			indexes.push(ind);
		} else {
			ind = document.calc.view.value.length;
		}
	}
}
function indexes_order() {
	indexes.sort(function(a,b){return a-b});
	indexes.reverse();
}
function parentheses_multip() {
	for (var i = 0; i < indexes.length; i++) {
		if (!isNaN(document.calc.view.value[indexes[i] - 1]) && document.calc.view.value[indexes[i] - 1] != "√") {
			document.calc.view.value = document.calc.view.value.slice(0,indexes[i]) + "*" + document.calc.view.value.slice(indexes[i]);
		}
		else if (document.calc.view.value[indexes[i] - 1] == "(") {
			document.calc.view.value = document.calc.view.value.slice(0,indexes[i]) + "1*" + document.calc.view.value.slice(indexes[i]);
		}
	}
}
function parentheses_complete() {
	var left = (document.calc.view.value.match(/\(/g) || []).length;
	var right = (document.calc.view.value.match(/\)/g) || []).length;
	var dif = left - right;
	if (dif > 0) {
		document.calc.view.value = document.calc.view.value + ")".repeat(dif);
	}
	else if (dif < 0) {
		while (dif < 0) {
			index = document.calc.view.value.lastIndexOf(")");
			document.calc.view.value = document.calc.view.value.substring(0,index) + document.calc.view.value.substring(index+1)
			dif++;
		}
	}
}
function angle(a) {
	if (document.getElementById('degree_rad').checked) {/*radians*/
		return a;
	} else {/*degree*/
		return a*(Math.PI/180);
	}
}
function trig_equal_check() {
	if (indexes.length > 1) {
		for (var i = 0; i < indexes.length; i++) {
			var e1 = e2 = "";
			if (document.calc.view.value[indexes[i]-1] != "c") {
				e1 = document.calc.view.value[indexes[i]] + document.calc.view.value[indexes[i]+1] + document.calc.view.value[indexes[i]+2];
			}
			else if (document.calc.view.value[indexes[i+1]-1] != "c") {
				e2 = document.calc.view.value[indexes[i+1]] + document.calc.view.value[indexes[i+1]+1] + document.calc.view.value[indexes[i+1]+2];
			}
			else if (document.calc.view.value[indexes[i]-1] == "c") {
				e1 = document.calc.view.value[indexes[i]-1] + document.calc.view.value[indexes[i]] + document.calc.view.value[indexes[i]+1] + document.calc.view.value[indexes[i]+2];
			}
			else if (document.calc.view.value[indexes[i+1]-1] == "c") {
				e2 = document.calc.view.value[indexes[i+1]-1] + document.calc.view.value[indexes[i+1]] + document.calc.view.value[indexes[i+1]+1] + document.calc.view.value[indexes[i+1]+2];
			}
			if (e1 == e2) {
				indexes.splice(i+1, 1);
			}
		}
	}
}
function trig_return(i) {
	if (indexes[i] > 0 && document.calc.view.value[indexes[i]-1] == "c") {
		return "arc" + document.calc.view.value[indexes[i]] + document.calc.view.value[indexes[i]+1] + document.calc.view.value[indexes[i]+2];
	} else {
		return document.calc.view.value[indexes[i]] + document.calc.view.value[indexes[i]+1] + document.calc.view.value[indexes[i]+2];
	}
}
function trig_calc(t,n) {
	r = String(eval(n));
	if (t == "sin") {
		return Math.sin(r).toFixed(15);
	}
	else if (t == "cos") {
		return Math.cos(r).toFixed(15);
	}
	else if (t == "tan") {
		return Math.tan(r).toFixed(15);
	}
	else if (t == "sic") {
		return (1/Math.cos(r)).toFixed(15);
	}
	else if (t == "csc") {
		return (1/Math.sin(r)).toFixed(15);
	}
	else if (t == "cot") {
		return (1/Math.tan(r)).toFixed(15);
	}
	else if (t == "arcsin") {
		return Math.asin(r).toFixed(15);
	}
	else if (t == "arccos") {
		return Math.acos(r).toFixed(15);
	}
	else if (t == "arctan") {
		return Math.atan(r).toFixed(15);
	}
	else if (t == "arcsic") {
		return Math.acos(1/r).toFixed(15);
	}
	else if (t == "arccsc") {
		return (Math.asin(1/r)).toFixed(15);
	}
	else if (t == "arccot") {
		return (Math.atan(1/r)).toFixed(15);
	}
}
function trig_replace() {
	for (var i = 0; i < indexes.length; i++) {
		var n1 = n2 = t = regex = "";
		n1 = document.calc.view.value.slice(indexes[i] + 4);
		for (j = 0; j < n1.length; j++) {
			if (!isNaN(n1[j]) || n1[j] == "π" || n1[j] == "e" || n1[j] == "%" || n1[j] == "+"
			  || n1[j] == "-" || n1[j] == "x" || n1[j] == "÷" || n1[j] == "^" || n1[j] == "√") {
				n2 += n1[j];
			} else {
				break;
			}
		}
		n3 = angle(n2);
		t = trig_return(i);
		regex = new RegExp(t + "\\(" + n2 + "\\)","g");
		change(regex,trig_calc(t,n3));
	}
}
function result() {
	change(/sec/g,"sic"); /*To avoid problems with Euler number*/
	e_pi("π");
	e_pi("e");
	change(/π/g,Math.PI);
	change(/e/g,Math.E);
	change(/x/g,"*");
	change(/÷/g,"/");
	change(/\^/g,"**");
	change(/%/g,"/100");
	indexes = [];
	indexes_find(0,".");
	if (indexes.length > 1) {
		indexes_order();
		dot_complete();
	}
	else if (indexes.length == 1) {
		dot_complete();
	}
	indexes = [];
	indexes_find(0,"!");
	if (indexes.length > 1) {
		indexes_order();
		factorialize_calc();
	}
	else if (indexes.length == 1) {
		factorialize_calc();
	}
	indexes = [];
	parentheses_remove();
	indexes_find(1,"(");
	if (indexes.length > 1) {
		indexes_order();
		parentheses_multip();
	}
	else if (indexes.length == 1) {
		parentheses_multip();
	}
	parentheses_complete();
	indexes = [];
	indexes_find(0,"sin(");
	indexes_find(0,"cos(");
	indexes_find(0,"tan(");
	indexes_find(0,"sic(");
	indexes_find(0,"csc(");
	indexes_find(0,"cot(");
	indexes_find(0,"arcsin(");
	indexes_find(0,"arccos(");
	indexes_find(0,"arctan(");
	indexes_find(0,"arcsec(");
	indexes_find(0,"arccsc(");
	indexes_find(0,"arccot(");
	trig_equal_check();
	if (indexes.length > 1) {
		indexes_order();
		trig_replace();
	}
	else if (indexes.length == 1) {
		trig_replace();
	}
	log_calc();
	ln_calc();
	parentheses_complete();
	root();
	try{
		document.calc.view.value = Math.round(eval(document.calc.view.value) * 10000000000000) / 10000000000000;
	} catch {
		document.calc.view.value = "ERROR";
	}
}