package io.ambassador.ambcodequickstartapp.verylargejavaservice.rest;

public class MerchSearch {
    private String country;
    private String season;

    public MerchSearch() {
    }

    public MerchSearch(String country, String season) {
        this.country = country;
        this.season = season;
    }

    public String getCountry() {
        return country;
    }

    public String getSeason() {
        return season;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setSeason(String season) {
        this.season = season;
    }
}
