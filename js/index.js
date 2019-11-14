$(() => {
  $('.sidenav').sidenav();
  $('.modal').modal();
  
  var list = document.querySelectorAll('select');
  var selects = M.FormSelect.init(list, {});
});