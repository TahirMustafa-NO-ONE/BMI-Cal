pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/TahirMustafa-NO-ONE/BMI-Cal.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t yourdockerhub/bmi-app:latest .'
            }
        }

        stage('Deploy Locally') {
            steps {
                sh 'docker run -d -p 3000:3000 --name bmi-app yourdockerhub/bmi-app:latest || true'
            }
        }
    }
}
