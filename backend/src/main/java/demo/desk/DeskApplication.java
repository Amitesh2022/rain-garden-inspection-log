package demo.desk;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.time.LocalDate;
@SpringBootApplication
public class DeskApplication {
 public static void main(String[] args) { SpringApplication.run(DeskApplication.class,args); }
 @Bean CommandLineRunner seed(DeskRepository repo) {
  return args -> { if (repo.all().isEmpty()) {
  repo.insert("1",new DeskRecord.Input("Clogged inlet at Linden court","Courtyard crew","Rain garden","Reported","Linden court / RG-14",LocalDate.now().plusDays(2),"Remove leaf mat from the inlet and check whether water enters both cells.",8));
  repo.insert("2",new DeskRecord.Input("Leaf buildup on canal swale","Public space team","Swale","Scheduled","Canal south / SW-02",LocalDate.now().plusDays(6),"Sweep leaves near the curb before the next maintenance round.",4));
  repo.insert("3",new DeskRecord.Input("Ponding beside nursery path","Drainage crew","Soakaway","Cleared","Nursery east / SO-11",LocalDate.now().plusDays(10),"Second inspection found less than two centimetres of standing water.",1));
  repo.insert("4",new DeskRecord.Input("Silt after the first autumn storm","Courtyard crew","Rain garden","Reported","Library court / RG-09",LocalDate.now().plusDays(14),"Clear silt using the scheduled maintenance visit.",12));
  repo.insert("5",new DeskRecord.Input("Overflow at theatre entrance","Public space team","Swale","Scheduled","Theatre north / SW-18",LocalDate.now().plusDays(18),"Confirm the overflow grate is accessible on event days.",5));
  repo.insert("6",new DeskRecord.Input("Inspection after courtyard resurfacing","Drainage crew","Soakaway","Cleared","Civic plaza / SO-04",LocalDate.now().plusDays(22),"Returned to the site after the rain and confirmed the soakaway had drained.",0));
  }};
 }
}
