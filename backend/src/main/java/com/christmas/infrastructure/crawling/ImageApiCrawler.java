package com.christmas.infrastructure.crawling;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Component;
import scala.compat.java8.PrimitiveIteratorConverters.SpecializerOfIterators;

@Slf4j
@Component
public class ImageApiCrawler {

    private static final String GOOGLE_MAP_URL = "https://www.google.co.kr/maps";

    public String crawlImage(final String placeName) {
        final String chromeDriverPath = getChromeDriverPath();
        if (chromeDriverPath == null) {
            throw new UnsupportedOsException(CrawlingErrorCode.NOT_SUPPORT_OS, Map.of("os", System.getProperty("os.name").toLowerCase()));
        }
        System.setProperty("webdriver.chrome.driver", chromeDriverPath);

        final ChromeOptions options = getChromeOptions();
        final WebDriver driver = new ChromeDriver(options);

        try {
            submitPlaceSearch(placeName, driver);
        } catch (Exception e) {
            driver.quit();
            log.warn("[이미지 크롤링 실패] - 이미지 태그 못찾아 타임아웃", e);
            return null;
        }

        final List<WebElement> images = driver.findElements(By.tagName("img"));
        for (final WebElement img : images) {
            final String src = img.getAttribute("src");
            if (src != null && src.contains("googleusercontent")) {
                driver.quit();
                log.info("[이미지 크롤링 성공] - {}", src);
                return src;
            }
        }
        driver.quit();
        log.info("[이미지 크롤링 실패] - 미리보기 이미지 못찾음");
        return null;
    }

    private ChromeOptions getChromeOptions() {
        final ChromeOptions options = new ChromeOptions();
        options.addArguments(
                "--headless",
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--disable-software-rasterizer",
                "--disable-blink-features=AutomationControlled",
                "--window-size=1920,1080",
                "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.6367.78 Safari/537.36"
        );
        options.setPageLoadTimeout(Duration.ofSeconds(30));
        options.setScriptTimeout(Duration.ofSeconds(30));
        return options;
    }

    private String getChromeDriverPath() {
        final String os = System.getProperty("os.name").toLowerCase();
        final String basePath = "./backend/src/main/resources/driver/";
        if (os.contains("mac")) {
            return basePath + "chromedriver-mac";
        }
        if (os.contains("linux")) {
            return "/usr/bin/chromedriver";
        }
        return null;
    }

    private void submitPlaceSearch(final String placeName, final WebDriver driver) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        log.info("구글맵 접속 시도");
        driver.get(GOOGLE_MAP_URL);
        log.info("구글맵 접속 성공");
        log.info("페이지 title: {}", driver.getTitle());
        log.info("page source 앞 1000자: \n{}", driver.getPageSource().substring(0, 1000));

        WebElement searchBox = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("searchboxinput")));
        log.info("searchboxinput 찾음");
        searchBox.sendKeys(placeName);

        WebElement searchButton = driver.findElement(By.id("searchbox-searchbutton"));
        log.info("searchbox-searchbutton 찾음");
        searchButton.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("img[src*='googleusercontent']")));
    }
}
