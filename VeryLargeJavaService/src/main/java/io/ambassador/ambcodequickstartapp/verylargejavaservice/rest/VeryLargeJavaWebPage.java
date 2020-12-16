package io.ambassador.ambcodequickstartapp.verylargejavaservice.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VeryLargeJavaWebPage {

    @GetMapping("/")
    public String getWebPage() {
        return "TODO";
    }
}
