package pl.edu.pjatk.nbd;

import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException, InterruptedException {
        System.out.println("---WSTAWIANIE DOKUMENTU---");
        Runtime.getRuntime()
                .exec("curl -H \"Content-Type: application/json\" -X POST http://192.168.1.45:8098/buckets/s25554java/keys/jnowak -d \"{\"name\": \"Jakub\", \"lastName\": \"Nowak\", \"age\": 25, \"balance\":888}\"")
                .waitFor();

        System.out.println("---ODCZYTYWANIE OBIEKTU Z BAZY---");
        Process process = Runtime
                .getRuntime()
                .exec("curl http://192.168.1.45:8098/buckets/s25554java/keys/jnowak");
        process.waitFor();
        InputStream stream = process.getInputStream();
        BufferedReader input = new BufferedReader(new InputStreamReader(stream), 1);
        System.out.println( input.readLine());

        System.out.println("---MODYFIKACJA OBIEKTU---");
        Runtime.getRuntime()
                .exec("curl -H \"Content-Type: application/json\" -X POST http://192.168.1.45:8098/buckets/s25554java/keys/jnowak -d \"{\"name\": \"Kamil\", \"lastName\": \"Walo\", \"age\": 25, \"balance\":888}\"")
                .waitFor();

        System.out.println("---ODCZYTYWANIE OBIEKTU Z BAZY---");
        process = Runtime.getRuntime()
                .exec("curl http://192.168.1.45:8098/buckets/s25554java/keys/jnowak");
        process.waitFor();
        stream = process.getInputStream();
        input = new BufferedReader(new InputStreamReader(stream), 1);
        System.out.println( input.readLine());

        System.out.println("---USUWANIE OBIEKTU Z BAZY---");
        Runtime.getRuntime()
                .exec("curl -i -XDELETE http://192.168.1.45:8098/buckets/s25554java/keys/jnowak")
                .waitFor();

        System.out.println("---ODCZYTYWANIE USUNIĘTEGO OBIEKTU Z BAZY---");
        process = Runtime.getRuntime().exec("curl http://192.168.1.45:8098/buckets/s25554java/keys/jnowak");
        stream = process.getInputStream();
        input = new BufferedReader(new InputStreamReader(stream), 1);
        System.out.println( input.readLine());
    }
}
