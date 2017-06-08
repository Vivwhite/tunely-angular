angular
  .module('tunely')
  .controller('SongsIndexController', SongsIndexController);

  SongsIndexController.$inject = ['$http', '$routeParams'];

function SongsIndexController ($http, $routeParams){
  var vm = this

  $http({
    method: 'GET',
    url: '/api/albums/' + $routeParams.id
  }).then(function successCallback(response) {
    vm.songs = response.data.songs;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });


  vm.createSong = function () {
    $http({
      method: 'POST',
      url: '/api/albums/' + $routeParams.id + '/songs',
      data: vm.newSong,
    }).then(function successCallback(response) {
      vm.songs.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.editSong = function (song) {
    $http({
      method: 'PUT',
      url: '/api/albums/'+ $routeParams.id + '/songs/' + song._id,
      data: song
    }).then(function successCallback(json) {
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }


  vm.deleteSong = function (song) {
    $http({
      method: 'DELETE',
      url: '/api/albums/'+ $routeParams.id + '/songs/'+ song._id,
    }).then(function successCallback(json) {
      var index = vm.songs.indexOf(song);
      vm.songs.splice(index,1)
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }

}
