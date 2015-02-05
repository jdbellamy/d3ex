/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['d3ex-client'],
  /**
   * Your New Relic license key.
   */
  license_key : '1edafb0eb5b0c5df481c734aa3ca63af6f6690ef',
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'debug'
  }
};
