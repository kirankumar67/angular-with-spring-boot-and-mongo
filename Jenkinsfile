pipeline {
    agent any

    stages {  
         stage('maven build') {
            steps {
             sh  "mvn clean package spring-boot"
            }
        }
       
         stage('archive artifat') {
            steps {
                archiveArtifacts artifacts: '**/target/*.war', followSymlinks: false
            }
        }
        
      // stage('tocat deplye') {
           steps {
        //sh  "java -jar 

          //  }
       // }
    }
}

