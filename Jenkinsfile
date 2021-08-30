pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim' 
            args '-p 3003:3003' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        // stage('Production') {
        //     steps {
        //         withAWS(region:'Bulgaria', credentials:'1k2note34') {
        //             s3Delete(bucket: 'Note app', path:'**/*')
        //             s3Upload(bucket: 'Note app', workingDir:'build', includePathPattern:'**/*');
        //         }
        //     }
        // }
    }
}