var app = angular.module('photoStickerApp', []);

app.controller('photoStickerController', function($scope, $timeout) {
    
	$scope.thumbnail = {
        dataUrl: '',
		error: '',
		stickerError: ''
    };
	
	//$scope.stickers = [{ title: '', dataUrl: '' }];
	$scope.stickers = [];
	$scope.selectedSticker;
	$scope.selectedStickerTitle;
	$scope.formError = "";
	
	$scope.fileReaderSupported = window.FileReader != null;
    
	//Main photo change button event
	$scope.photoChanged = function(files){
        if (files != null) {
            var file = files[0];
			if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
				$timeout(function() {
					var fileReader = new FileReader();
					fileReader.readAsDataURL(file);
					fileReader.onload = function(e) {
						$timeout(function(){
							$scope.thumbnail.dataUrl = e.target.result;
						});
					}
				});
			} else {
				$scope.thumbnail.error = "Please select valid image.";
			}
		}
    };
	
	//on change of file upload in dialog
	$scope.stickerPhotoChanged = function(files){
		if (files != null) {
            var file = files[0];
			if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
				$timeout(function() {
					var fileReader = new FileReader();
					fileReader.readAsDataURL(file);
					fileReader.onload = function(e) {
						$timeout(function(){
							$scope.selectedSticker = e.target.result;
						});
					}
				});
			} else {
				$scope.thumbnail.stickerError = "Please select valid image.";
			}
		}
	}
	
	//Dialog modal button upload click
	$scope.stickerPhotoUpload = function(){
		var stickerTitle, el;
		stickerTitle = $('#stickerTitle').val();
		if($scope.selectedSticker && stickerTitle) {
			el = $('<div class="sticker ui-widget-content"><div><img title="'+ stickerTitle +'" src="' + $scope.selectedSticker + '"/></div></div>');
			$("#photoStickers").append(el);
			$(el).draggable();
			$('#stickerModal').modal('hide');
		}
    };
	
});