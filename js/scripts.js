//business logic
function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}
function Contact(first, last, addresses) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
};
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};
Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}
function resetFields(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-street").val("");
  $("input#new-city").val("");
  $("input#new-state").val("");
};

// user interface logic
$(document).ready(function() {
//add new address form
  $("#add-address").click(function() {
    $("#new-addresses").append(
      '<div class="new-second-address">' +
       '<div class="form-group extra">' +
       '<h2>Second Home</h2>' +
         '<label for="new-street">Street</label>' +
         '<input type="text" class="form-control new-street" id="second-street">' +
       '</div>' +
       '<div class="form-group extra">' +
         '<label for="new-city">City</label>' +
         '<input type="text" class="form-control new-city"id="second-city">' +
       '</div>' +
       '<div class="form-group extra">' +
         '<label for="new-state">State</label>' +
         '<input type="text" class="form-control new-state"id="second-state">' +
       '</div>' +
     '</div>' +
     '<div class="new-work-address">' +
        '<div class="form-group extra">' +
        '<h2>Work Address</h2>' +
          '<label for="new-street">Street</label>' +
          '<input type="text" class="form-control new-street" id="work-street">' +
        '</div>' +
        '<div class="form-group extra">' +
          '<label for="new-city">City</label>' +
          '<input type="text" class="form-control new-city" id="work-city">' +
        '</div>' +
        '<div class="form-group extra">' +
          '<label for="new-state">State</label>' +
          '<input type="text" class="form-control new-state" id="work-state">' +
        '</div>' +
      '</div>'
  );
  });
  //add contact submit
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
//First address inputs
      var inputtedStreet = $(this).find("input#new-street").val();
      var inputtedCity = $(this).find("input#new-city").val();
      var inputtedState = $(this).find("input#new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress)
    });
// second inputs
    $(".new-second-address").each(function() {
        inputtedSecondStreet = $(this).find("input#second-street").val();
        inputtedSecondCity = $(this).find("input#second-city").val();
        inputtedSecondState = $(this).find("input#second-state").val();
        newSecondAddress = new Address(inputtedSecondStreet, inputtedSecondCity, inputtedSecondState)
      newContact.addresses.push(newSecondAddress);
      });
// work address inputs
    $(".new-work-address").each(function() {
        inputtedWorkStreet = $(this).find("input#work-street").val();
        inputtedWorkCity = $(this).find("input#work-city").val();
        inputtedWorkState = $(this).find("input#work-state").val();
        newWorkAddress = new Address(inputtedWorkStreet, inputtedWorkCity, inputtedWorkState)
      newContact.addresses.push(newWorkAddress);
    $(".extra").remove();
  });
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
// remove inputted text from all fields
    resetFields();

  });
});
