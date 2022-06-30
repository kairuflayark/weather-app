export interface WeatherData {
    location: {
        city: string,
        state: string,
        zip: number
    }
    condition: {
        text: string,
        icon: string
    }
    last_updated: Date
    temp_c: number
    temp_f: number
    feelslike_c: number
    feelslike_f: number
    wind_kph: number
    wind_mph: number
    wind_dir: string
    gust_kph: number
    gust_mph: number
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity:number
    cloud:number
    vis_km: number
    vis_miles: number

}