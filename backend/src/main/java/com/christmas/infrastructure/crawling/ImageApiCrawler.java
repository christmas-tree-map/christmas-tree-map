package com.christmas.infrastructure.crawling;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Component;

@Component
public class ImageApiCrawler {

    private static final String GOOGLE_MAP_URL = "https://www.google.co.kr/maps";

    public String crawlImage(final String placeName) {
        final String chromeDriverPath = getChromeDriverPath();
        if (chromeDriverPath == null) {
            throw new UnsupportedOsException(CrawlingErrorCode.NOT_SUPPORT_OS, Map.of("os", System.getProperty("os.name").toLowerCase()));
        }
        System.setProperty("webdriver.chrome.driver", chromeDriverPath);

        final ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--window-size=1920,1080");
        final WebDriver driver = new ChromeDriver(options);

        try {
            submitPlaceSearch(placeName, driver);
        } catch (TimeoutException e) {
            return null;
        }

        final List<WebElement> images = driver.findElements(By.tagName("img"));
        for (final WebElement img : images) {
            final String src = img.getAttribute("src");
            if (src != null && src.contains("googleusercontent")) {
                driver.quit();
                return src;
            }
        }
        driver.quit();
        return null;
    }

    private String getChromeDriverPath() {
        final String os = System.getProperty("os.name").toLowerCase();
        final String basePath = "./backend/src/main/resources/driver/";
        if (os.contains("mac")) {
            return basePath + "chromedriver-mac";
        }
        if (os.contains("linux")) {
            return "/usr/local/bin/chromedriver";
        }
        return null;
    }

    private void submitPlaceSearch(final String placeName, final WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get(GOOGLE_MAP_URL);
        WebElement searchBox = driver.findElement(By.id("searchboxinput"));
        searchBox.sendKeys(placeName);
        WebElement searchButton = driver.findElement(By.id("searchbox-searchbutton"));
        searchButton.click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("img[src*='googleusercontent']")));
    }
}
