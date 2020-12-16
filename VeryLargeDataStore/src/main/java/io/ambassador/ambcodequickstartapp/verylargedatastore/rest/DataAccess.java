package io.ambassador.ambcodequickstartapp.verylargedatastore.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataAccess {
    @GetMapping("/")
    public String getRecordCount() {
        return "99999999999999";
    }
}
