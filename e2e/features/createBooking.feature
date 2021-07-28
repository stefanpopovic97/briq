Feature: Create Booking
    As a  user
    I want to be able to search for leisure activities
    So that i can create booking

    Scenario: Create Booking
        Given the user is navigated to the portal page
        And the user enters number of people to join the activities
        And the user enters date for the visit
        And the user chooses which activities
        And the user clicks on the button to add to cart
        And the user selects time for check in
        And the user enters personal information
        When the user clicks on confirmation button
        Then the bookings is created successfully