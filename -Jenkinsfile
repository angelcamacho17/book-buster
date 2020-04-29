pipeline {
    agent any
    environment {
        APPNAME="fecommerce"
        WEBAPPDIR="/data/webapp/${APPNAME}/${BRANCH_NAME}"
        BASEHREF="/${APPNAME}/${BRANCH_NAME}/"
        GITDIR="."
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
    }
    stages {
        stage('Prepare') {
            steps {
                dir(env.GITDIR) {
                    sh 'rm -rf build/logs && rm -rf dist/'
                    sh 'mkdir -p build && mkdir -p build/logs'
                    sh 'rm -rf dist'
                    sh 'npm install --no-optional --no-bin-links'
                }
            }
        }
        stage('Lint') {
            steps {
                dir(env.GITDIR) {
                    sh 'ng lint'
                }
            }
        }
        stage('Build') {
            steps {
                dir(env.GITDIR) {
                    sh 'ng build --base-href ${BASEHREF} --progress=false --buildOptimizer=false --prod'
                    sh 'rm -f build/logs/dist_${BRANCH_NAME}.tar'
                    sh 'chmod -R 755 dist/'
                    sh 'tar -cf build/logs/dist_${BRANCH_NAME}.tar dist/*'
                    archiveArtifacts artifacts: "build/logs/*", onlyIfSuccessful: true
                }
            }
        }        
        stage('Deploy feature') {
            when {
                branch 'Feature*'
            }
            steps {
              milestone(null)
              dir(env.GITDIR) {
                    sh 'mkdir -p ${WEBAPPDIR} && mkdir -p ${WEBAPPDIR}/dist'
                    sh 'rm -rf ${WEBAPPDIR}/dist/'
                    sh 'mkdir -p ${WEBAPPDIR}/dist/'
                    sh 'tar -xf  build/logs/dist_${BRANCH_NAME}.tar --strip-components=3 -C ${WEBAPPDIR}/dist/'
                }
            }
        }         
        stage('Deploy development') {
            when {
                branch 'develop'
            }
            steps {
              milestone(null)
              dir(env.GITDIR) {
                    sh 'mkdir -p ${WEBAPPDIR}/dist'
                    sh 'rm -rf ${WEBAPPDIR}/dist/'
                    sh 'mkdir -p ${WEBAPPDIR}/dist/'
                    sh 'tar -xf  build/logs/dist_${BRANCH_NAME}.tar --strip-components=3 -C ${WEBAPPDIR}/dist/'
                }
            }
        }
        stage('Deploy staging') {
            when {
                branch 'staging'
            }
            steps {
              milestone(null)
              dir(env.GITDIR) {
                    sh 'mkdir -p ${WEBAPPDIR}/dist'
                    sh 'rm -rf ${WEBAPPDIR}/dist/'
                    sh 'mkdir -p ${WEBAPPDIR}/dist/'
                    sh 'tar -xf  build/logs/dist_${BRANCH_NAME}.tar --strip-components=3 -C ${WEBAPPDIR}/dist/'
                }
            }
        }
    }
    post {
        failure {
            emailext subject: "JOB FAILED: '${env.JOB_NAME} [${env.BUILD_NUMBER}]'", body: "Job FAILED: ${env.JOB_NAME} [${env.BUILD_NUMBER}] ${env.RUN_DISPLAY_URL}", recipientProviders: [[$class: 'DevelopersRecipientProvider']]
        }
    }    
}