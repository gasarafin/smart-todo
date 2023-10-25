package capstone.smarttodo.models;

import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

// Draft - modified slightly from fans
public class Result<T> {
    private final ArrayList<String> errorMessages = new ArrayList<>();
    private HttpStatus status = HttpStatus.OK;
    private T payload;


    public boolean isSuccess() {
        return status == HttpStatus.OK;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;

        if (payload == null) {
            errorMessages.add("Payload is Null.");
            this.status = HttpStatus.NOT_FOUND;
        }
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public List<String> getErrorMessages() {
        return new ArrayList<>(errorMessages);
    }

    public void addErrorMessage(String errorMessage, HttpStatus status) {
        this.errorMessages.add(errorMessage);
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Result<?> result = (Result<?>) o;
        return Objects.equals(errorMessages, result.errorMessages) && Objects.equals(payload, result.payload);
    }

    @Override
    public int hashCode() {
        return Objects.hash(errorMessages, payload);
    }
}
