-- Sample Weather Data
-- Initial weather information for the system
-- Created: 2025-01-27

INSERT INTO public.weather_updates (weather_condition, temperature, humidity, pressure, wind_speed, wind_direction, visibility, alert_level, forecast_data) VALUES
('Partly Cloudy', 28.5, 75, 1013.2, 15.3, 'Northeast', 10.0, 'none', 
'{"forecast": [
    {"day": "Today", "condition": "Partly Cloudy", "high": 32, "low": 24, "rain_chance": 20},
    {"day": "Tomorrow", "condition": "Scattered Showers", "high": 30, "low": 23, "rain_chance": 60},
    {"day": "Day After", "condition": "Thunderstorms", "high": 29, "low": 22, "rain_chance": 80}
]}'),

('Light Rain', 26.0, 85, 1008.5, 22.1, 'Southwest', 8.0, 'yellow', 
'{"forecast": [
    {"day": "Today", "condition": "Light Rain", "high": 28, "low": 22, "rain_chance": 70},
    {"day": "Tomorrow", "condition": "Heavy Rain", "high": 27, "low": 21, "rain_chance": 90},
    {"day": "Day After", "condition": "Cloudy", "high": 29, "low": 23, "rain_chance": 30}
]}'),

('Sunny', 31.2, 60, 1015.8, 8.5, 'East', 15.0, 'none', 
'{"forecast": [
    {"day": "Today", "condition": "Sunny", "high": 34, "low": 26, "rain_chance": 5},
    {"day": "Tomorrow", "condition": "Partly Cloudy", "high": 33, "low": 25, "rain_chance": 15},
    {"day": "Day After", "condition": "Sunny", "high": 35, "low": 27, "rain_chance": 10}
]}')

ON CONFLICT DO NOTHING;
