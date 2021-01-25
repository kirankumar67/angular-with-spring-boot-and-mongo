pipeline {
    agent any

    stages {  
         stage('maven build') {
            steps {
             sh  "mvn clean package"
            }
        }
       
         stage('archive artifat') {
            steps {
                archiveArtifacts artifacts: '**/target/*.jar', followSymlinks: false
            }
        }
        
      // stage('tocat deplye') {
          // steps {
        //sh  "java -jar 

          //  }
       // }
    }
}

