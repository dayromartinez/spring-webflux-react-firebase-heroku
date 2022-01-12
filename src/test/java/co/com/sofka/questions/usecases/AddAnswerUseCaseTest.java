package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

@SpringBootTest
class AddAnswerUseCaseTest {

    @SpyBean
    AddAnswerUseCase addAnswerUseCase;

    @MockBean
    GetUseCase getUseCase;

    @MockBean
    AnswerRepository answerRepository;


    @Test
    void addAnswerTest() {

        var questionDTO = new QuestionDTO("22", "abcd","funciona?","desarrollo", "djmd96@hotmail.com");
        var answerDTO = new AnswerDTO("11","22","funciona","33");

        var answer = new Answer();
        answer.setId("33");
        answer.setQuestionId("22");
        answer.setUserId("11");
        answer.setAnswer("funciona");

        Mockito.when(answerRepository.save(Mockito.any(Answer.class))).thenReturn(Mono.just(answer));
        Mockito.when(getUseCase.apply(Mockito.anyString())).thenReturn(Mono.just(questionDTO));


        var resultDTO = addAnswerUseCase.apply(answerDTO);
        var resultQuestionDTO = resultDTO.block();

        assert resultQuestionDTO != null;
        Assertions.assertEquals(resultQuestionDTO.getId(),questionDTO.getId());
        Assertions.assertEquals(resultQuestionDTO.getQuestion(),questionDTO.getQuestion());
        Assertions.assertEquals(resultQuestionDTO.getAnswers().get(0).getQuestionId(),answerDTO.getQuestionId());
        Mockito.verify(answerRepository).save(Mockito.any());
    }

}