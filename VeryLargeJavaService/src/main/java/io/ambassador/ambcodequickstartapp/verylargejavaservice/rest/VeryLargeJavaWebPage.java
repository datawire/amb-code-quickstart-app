package io.ambassador.ambcodequickstartapp.verylargejavaservice.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.Map;


@Controller
public class VeryLargeJavaWebPage {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${nodeservice.host}")
    String nodeServiceHost;

    @Value("${nodeservice.port}")
    String nodeServicePort;

    @GetMapping("/greeting")
    public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name, Model model,
                           @RequestHeader Map<String, String> headers) {
        model.addAttribute("name", name);

        System.out.println("Headers" + headers);

        String nodeServiceURL = "http://" + nodeServiceHost + ":" + nodeServicePort;

        String color = restTemplate.getForObject(nodeServiceURL + "/color", String.class);
        color = color.replace("\"", "");
        model.addAttribute("color", color);

        String environment = restTemplate.getForObject(nodeServiceURL + "/environment", String.class);
        model.addAttribute("environment", environment);

        String recordCount = restTemplate.getForObject(nodeServiceURL + "/recordCount", String.class);
        model.addAttribute("recordCount", recordCount);

        return "greeting";
    }

    @GetMapping("/greetingHeaders")
    public String greetingWithHeaders(@RequestParam(name = "name", required = false, defaultValue = "World") String name, Model model,
                                      @RequestHeader Map<String, String> clientHeaders) {
        model.addAttribute("name", name);

        System.out.println("Headers" + clientHeaders);
        HttpHeaders headers = new HttpHeaders();
        headers.add(clientHeaders.get("testkey"), clientHeaders.get("testvalue"));
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        ResponseEntity<String> response = restTemplate.exchange("http://localhost:3000/color", HttpMethod.GET, entity, String.class);
        System.out.println(response.getBody());
        String color = response.getBody().toString();
        color = color.replace("\"", "");
        model.addAttribute("color", color);

        return "greeting";
    }
}