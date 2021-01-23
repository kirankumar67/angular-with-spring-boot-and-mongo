pipeline {
    agent any

    stages {  
         stage('maven build') {
            steps {
               sh 'mvn clean package'
            }
        }
        
         stage('archive artifat') {
            steps {
                archiveArtifacts artifacts: '**/target/*.war', followSymlinks: false
            }
        }
        
       // stage('tocat deplye') {
           // steps {
          //  sh "curl -v -u tomcat:tomcat -T /var/lib/jenkins/workspace/kiranpiplineproj/target/spring3-mvc-maven-xml-hello-world-1.0-SNAPSHOT.war 'http://3.137.206.62:8080/manager/text/deploy?path=/kiranproj&update=true'"

          //  }
       // }
    }
}

