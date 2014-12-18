define(["dat"], function(dat){

	var GUI = new dat.GUI();
	GUI.open();

	function addFolder(folder, parent){
		if (!parent){
			parent = GUI;
		}
		if (parent.__folders[folder]){
			return parent.__folders[folder];
		} else {		
			var fold = parent.addFolder(folder);
			return fold;
		}
	}

	return {
		add : function(folderName, obj, name, callback){
			var folder = addFolder(folderName);
			var gui = folder.add(obj, name).min(0);
			if (callback){
				gui.onChange(callback);
			}
		}
	};
});