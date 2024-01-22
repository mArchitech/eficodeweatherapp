*** Settings ***
Documentation    WeatherApp Integration Tests
Library          RequestsLibrary
Resource         SetupLibrary.robot
*** Variables ***
${BASE_URL}       http://localhost:9000

*** Test Cases ***
Verify Weather API
    [Tags]    Weather
    Create Session    WeatherAPI    ${BASE_URL}
    ${response}    Get Request    WeatherAPI    /api/weather
    Should Be Equal As Numbers    ${response.status_code}    200
    ${json_response}    Set Variable    ${response.json()}
    Should Contain    ${json_response}    weather
    Should Contain    ${json_response}    forecast